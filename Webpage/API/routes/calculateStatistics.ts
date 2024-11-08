import {Request, Response, Router} from "express";
import {getStaffByKey} from "../Service/StaffService.js";
import {AbsenceType_Techcode} from "../../DB/Techcodes/AbsenceType_Techcode.js";
import {authenticate} from "../authenticationMiddleware.js";
import {Staff} from "../../DB/Entities/Staff.js";
import {FlexTime} from "../../DB/Entities/FlexTime.js";

const router = Router();
async function validateStaffTimeTableEntries(staff:Staff) {
    for (const tableEntry of staff.timetables) {
        if (tableEntry.weekday != getWeekday(new Date(tableEntry.date))) {
            tableEntry.weekday = getWeekday(new Date(tableEntry.date));
            await tableEntry.save()
            console.log("Updated weekday");
        }
        if (tableEntry.abscence && (tableEntry.difference_performed_target != -(staff.target_hours) || tableEntry.performed_hours > 0))
            console.error(`Data manipulation detected for staff with ID: ${staff.staff_id} in TimeTable at index: ${tableEntry.index}  by  (${staff.first_name} ${staff.last_name})`);
    }
}
function getDaysInMonth(date:Date, staff:Staff): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()-staff.target_hours;
}
export function getWeekday(date: Date): string {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekday = date.getDay()
    return weekdays[weekday];
}

function calculateSickDays(staff:Staff): number | null {
    const timetableEntries = staff.timetables.filter(entry => entry.abscence == AbsenceType_Techcode.SICK);
    return timetableEntries.length;
}
function calculateRemainingVacationDays(staff:Staff): number | null {
    const timetableEntries = staff.timetables.filter(entry => entry.abscence == AbsenceType_Techcode.VACATION);
    return staff.max_vacation_days-timetableEntries.length;
}
async function calculateHoursThisOrPreviousWeek(staff:Staff, previousWeek:boolean = false): Promise<number | null> {
    // Get the current date and calculate the start and end of this week
    const currentDate:Date = new Date();
    const dayOfWeek:number = currentDate.getDay();
    const daysToMonday:number = (dayOfWeek + 6) % 7; // Get number of days to Monday
    const mondayStart:Date = new Date(currentDate);
    // If u want to calculate the hours of the previousweek, its the same procedure just 7 days earlier => mondaystart
    previousWeek ? mondayStart.setDate(currentDate.getDate() - daysToMonday-7) : mondayStart.setDate(currentDate.getDate() - daysToMonday) ; // Set to Monday

    const sundayEnd = new Date(mondayStart);
    sundayEnd.setDate(mondayStart.getDate() + 6); // Set to Sunday
    // Filter the timetable entries for this week, where the staff member worked
    const timetableEntries = staff.timetables.filter(timetable => {
        const entryDate = new Date(timetable.date);
        return entryDate >= mondayStart && entryDate <= sundayEnd && timetable.abscence == AbsenceType_Techcode.NONE;
    });
    // Calculation...
    let performedHoursThisWeek = 0;
    for (const timetableEntry of timetableEntries) {
        const start = new Date(timetableEntry.start);
        const end = new Date(timetableEntry.end);
        // No need to check for end as we assume that our company doesnt have night shifts.
        if (start < mondayStart || start > sundayEnd) {
            console.error("Skipped " + start);
            continue;
        }

        const workedMinutes = ((end.getTime() - start.getTime()) / 60000) - timetableEntry.pause_minutes; // Time in minutes
        let change:boolean = false;
        // If the hours are not the same as calculated: recalculate. Performed hours always include pause minutes (subtracted).

        if (((timetableEntry.performed_hours*60)) != workedMinutes) {
            timetableEntry.performed_hours = workedMinutes / 60;
            change = true;
        }
        if (timetableEntry.difference_performed_target !=  (workedMinutes/60) - staff.target_hours) {
            timetableEntry.difference_performed_target =  (workedMinutes/60) - staff.target_hours;
            change = true;
        }
        change ? await timetableEntry.save() : console.log("No need to save");
        const workedHours = workedMinutes/ 60;
        performedHoursThisWeek += workedHours;
    }
    return performedHoursThisWeek;
}

async function calcuclateThisMonthHours(staff:Staff){
    const currentDate:Date = new Date();
    const month = currentDate.getMonth(); // 0-11
    const timetableEntries = staff.timetables.filter(timetable => {
        const entryDate = new Date(timetable.date);
        return entryDate.getMonth() == month && timetable.abscence == AbsenceType_Techcode.NONE;
    });
    let hours = 0;
    for (const timetableEntry of timetableEntries){
        const start = new Date(timetableEntry.start);
        const end = new Date(timetableEntry.end);
        const workedMinutes = ((end.getTime() - start.getTime()) / 60000) - timetableEntry.pause_minutes; // Time in minutes
        let change:boolean = false;
        // If the hours are not the same as calculated: recalculate. Performed hours always include pause minutes (subtracted).
        if (((timetableEntry.performed_hours*60)) != workedMinutes) {
            timetableEntry.performed_hours = workedMinutes / 60;
            change = true;
        }
        if (timetableEntry.difference_performed_target !=  (workedMinutes/60) - staff.target_hours) {
            timetableEntry.difference_performed_target =  (workedMinutes/60) - staff.target_hours;
            change = true;
        }
        change ? await timetableEntry.save() : console.log("No need to save");
        const workedHours = workedMinutes/ 60;
        hours += workedHours;
    }
    return hours;
}

// Lässt sich durch difference_performed_target berechnen und staff.target_hours. Vacation muss abgezogen werden

function calculateFlexTime(staff:Staff): number {
    let flexTime:number = 0;
    if (!staff.flexTimes) return flexTime;
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const sollArbeitsStunden:number = staff.target_hours*5*4; // Monatliche arbeitstunden
    const max_vacation_perMonth:number = staff.max_vacation_days/12; // Anzahl an urlaubstagen pro monat
    const max_vacation_hour_perMonth:number = max_vacation_perMonth*staff.target_hours; // Anzahl an urlaubsstunden pro monat
    let totalDifferenceOnPerformedHours:number = 0;

    for (const entry of staff.timetables) {
        const entryDate = new Date(entry.date);
        // Check if the entry is in the current month and year
        if (entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear) {
            totalDifferenceOnPerformedHours += entry.difference_performed_target;
        }
    }
    totalDifferenceOnPerformedHours += max_vacation_hour_perMonth
    flexTime = totalDifferenceOnPerformedHours - sollArbeitsStunden;
    return Math.round(flexTime);
}

router.get("/", authenticate, async (req: Request, res: Response) => {
    try {
        const user = req.body.user;
        const staff = await getStaffByKey("staff_id", user.staff.staff_id);
        if (!staff) {
            console.error("No such staff!");
            console.error(`param was: ${req.params.id}\nstaffId was ${user.staff.staff_id}`);
            return;
        }
        await validateStaffTimeTableEntries(staff);
        const flexTime:number =  calculateFlexTime(staff)?? 0;
        let fTime = await FlexTime.findOne({
            relations:{
                staff:true
            },
            where:{
                staff:{
                    staff_id: staff.staff_id
                }
            }
        })
        if (!fTime) {
            fTime = new FlexTime();
            fTime.staff = staff;
        }
        if (fTime.available_flextime != flexTime) {
            fTime.available_flextime = flexTime;
            await fTime.save();
            console.warn(`Flex Time updated/added for ${fTime.staff.staff_id}  (${fTime.staff.first_name} ${fTime.staff.last_name})`);
        }
        const currentDate:Date = new Date();
        const hoursThisWeek:number = await calculateHoursThisOrPreviousWeek(staff) ?? 0;
        const hoursPreviousWeek:number = await calculateHoursThisOrPreviousWeek(staff, true) ?? 0;
        const sickDays:number =  calculateSickDays(staff) ?? 0;
        const remainingVacationDays:number =  calculateRemainingVacationDays(staff) ?? 0;
        const hoursThisMonth:number = await calcuclateThisMonthHours(staff) ?? 0;
        const mustWorkHoursMonth:number = staff.target_hours * getDaysInMonth(currentDate, staff);
        const dashboardStatistics = {
            flexTime: flexTime,
            hoursThisWeek: hoursThisWeek,
            hoursPreviousWeek: hoursPreviousWeek,
            hoursThisMonth: hoursThisMonth,
            mustWorkHoursMonth: mustWorkHoursMonth,
            sickDays: sickDays,
            remainingVacationDays: remainingVacationDays
        }
        res.json(dashboardStatistics);
    } catch (error) {
        console.error("Error calculating dashboard statistics", error);
        res.status(500).json({message: "Error calculating dashboard statistics"});
    }
});

export default router;