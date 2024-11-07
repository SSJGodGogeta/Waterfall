import {Request, Response, Router} from "express";
import {getStaffByKey} from "../Service/StaffService.js";
import {AbsenceType_Techcode} from "../../DB/Techcodes/AbsenceType_Techcode.js";
import {authenticate} from "../authenticationMiddleware.js";
import {Staff} from "../../DB/Entities/Staff.js";

const router = Router();
function validateStaffTimeTableEntries(staff:Staff) {
    for (const tableEntry of staff.timetables) {
        if (tableEntry.abscence && (tableEntry.difference_performed_target != -(staff.target_hours) || tableEntry.performed_hours > 0))
            console.error(`Data manipulation detected for staff with ID: ${staff.staff_id} in TimeTable at index: ${tableEntry.index}  by  (${staff.first_name} ${staff.last_name})`);
    }
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
        return entryDate >= mondayStart && entryDate <= sundayEnd && !timetable.abscence;
    });
    // Calculation...
    let performedHoursThisWeek = 0;
    for (const timetableEntry of timetableEntries) {
        const start = new Date(timetableEntry.start);
        const end = new Date(timetableEntry.end);
        // No need to check for end as we assume that our company doesnt have night shifts.
        if (start < mondayStart || start > sundayEnd) {
            console.error("Skipped " + start);
            console.error("Due to data corruption!!\n");
            console.error(`Current Week is from: ${mondayStart}   to   ${sundayEnd}`);
            continue;
        }
        const workedMinutes = (end.getTime() - start.getTime()) / 60000; // Time in minutes
        let change:boolean = false;
        if (timetableEntry.performed_hours != workedMinutes/60) {
            timetableEntry.performed_hours = workedMinutes / 60;
            change = true;
        }
        if (timetableEntry.difference_performed_target !=  (workedMinutes/60) - staff.target_hours) {
            timetableEntry.difference_performed_target =  (workedMinutes/60) - staff.target_hours;
            change = true;
        }
        change ? await timetableEntry.save() : console.log("No need to save");
        const workedHours = (workedMinutes - timetableEntry.pause_minutes) / 60;
        performedHoursThisWeek += workedHours;
    }
    return performedHoursThisWeek;
}

//TODO declared by Arman: How ? What are criterias for flex time ? How is it setup ? Do we need a flexTimeTechcode for it ?
function calculateFlexTime(staff:Staff): number {
    let flexTime:number = 0;
    if (!staff.flexTimes) return 0;
    for (const times of staff.flexTimes) {
        flexTime += times.available_flextime ?? 0;
    }
    return flexTime;
}

router.get("/:id", authenticate, async (req: Request, res: Response) => {
    try {
        const staffId:number = parseInt(req.params.id.replaceAll(":", ""));
        const staff = await getStaffByKey("staff_id", staffId);
        if (!staff) {
            console.error("No such staff!");
            console.error(`param was: ${req.params.id}\nstaffId was ${staffId}`);
            return;
        }
        validateStaffTimeTableEntries(staff);
        const flexTime:number =  calculateFlexTime(staff)?? 0;
        const hoursThisWeek:number = await calculateHoursThisOrPreviousWeek(staff) ?? 0;
        const hoursPreviousWeek:number = await calculateHoursThisOrPreviousWeek(staff) ?? 0;
        const sickDays:number =  calculateSickDays(staff) ?? 0;
        const remainingVacationDays:number =  calculateRemainingVacationDays(staff) ?? 0;
        const dashboardStatistics = {
            flexTime: flexTime,
            hoursThisWeek: hoursThisWeek,
            hoursPreviousWeek: hoursPreviousWeek,
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