import {Request, Response, Router} from "express";
import {getStaffByKey} from "../Service/StaffService.js";
import {AbsenceType_Techcode} from "../../DB/Techcodes/AbsenceType_Techcode.js";
import {authenticate} from "../authenticationMiddleware.js";
import {Staff} from "../../DB/Entities/Staff.js";
import {FlexTime} from "../../DB/Entities/FlexTime.js";
import {Absence} from "../../DB/Entities/Absence.js";
import {PermissionStatusTechcode} from "../../DB/Techcodes/PermissionStatus_Techcode.js";
import {Timetable} from "../../DB/Entities/TimeTable.js";

const router = Router();
const currentDate: Date = new Date();

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////         Tools          /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
async function validateStaffTimeTableEntries(staff: Staff) {
    for (const tableEntry of staff.timetables) {
        if (tableEntry.weekday != getWeekday(new Date(tableEntry.date))) {
            tableEntry.weekday = getWeekday(new Date(tableEntry.date));
            await tableEntry.save()
            console.log("Updated weekday");
        }
        if (tableEntry.abscence != AbsenceType_Techcode.NONE && (tableEntry.difference_performed_target != -(staff.target_hours)))
            console.error(`Data manipulation detected for staff with ID: ${staff.staff_id} in TimeTable at index: ${tableEntry.index}  by  (${staff.first_name} ${staff.last_name})`);
    }
}

export function getWeekday(date: Date): string {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekday = date.getDay()
    return weekdays[weekday];
}

async function calculateHours(timetableEntries: Timetable[], staff: Staff, mondayStart: Date | undefined, sundayEnd: Date | undefined, monthly: boolean = false): Promise<number> {
    if (!timetableEntries || !staff || timetableEntries.length == 0) return -1;
    let hours = 0;
    console.error("ENTRIES: ", timetableEntries.length);
    for (const timetableEntry of timetableEntries) {
        const start = new Date(timetableEntry.start);
        const end = new Date(timetableEntry.end);
        const workedMinutes = ((end.getTime() - start.getTime()) / 60000) - timetableEntry.pause_minutes; // Time in minutes
        let change: boolean = false;
        // No need to check for end as we assume that our company doesnt have night shifts.
        if (monthly && mondayStart && sundayEnd) {
            if (start < mondayStart || start > sundayEnd) {
                console.error("Skipped " + start);
                continue;
            }
        }
        // If the hours are not the same as calculated: recalculate. Performed hours always include pause minutes (subtracted).
        if (((timetableEntry.performed_hours * 60)) != workedMinutes) {
            timetableEntry.performed_hours = workedMinutes / 60;
            change = true;
        }
        if (timetableEntry.difference_performed_target != (workedMinutes / 60) - staff.target_hours) {
            timetableEntry.difference_performed_target = (workedMinutes / 60) - staff.target_hours;
            change = true;
        }
        change ? await timetableEntry.save() : console.log("No need to save");
        const workedHours = workedMinutes / 60;
        hours += workedHours;
    }
    console.error("HOURS: ", hours);
    return hours;
}

async function calculateHoursThisOrPreviousWeek(staff:Staff, previousWeek = false) {
    const currentDate = new Date();
    const daysToMonday = (currentDate.getDay() + 6) % 7; // Days to last Monday

    // Adjust `mondayStart` based on `previousWeek`
    const mondayStart = new Date(currentDate);
    if (previousWeek) {
        mondayStart.setDate(currentDate.getDate() - daysToMonday - 8); // Go back to previous week's Monday
    } else {
        mondayStart.setDate(currentDate.getDate() - daysToMonday+1); // This week's Monday
    }
    mondayStart.setHours(0, 0, 0, 0);

    // Set `sundayEnd` to the end of the same week (current or previous)
    const sundayEnd = new Date(mondayStart);
    sundayEnd.setDate(mondayStart.getDate() + 5); // Move to Sunday of that week
    sundayEnd.setHours(23, 59, 59, 999);

    console.log("Week Start (Monday):", mondayStart);
    console.log("Week End (Sunday):", sundayEnd);
    //console.error("Entries in staff.timetables = ", staff.timetables);
    // Filter timetables within this week's range, with no absence
    const timetableEntries = staff.timetables.filter(entry => {
        return entry.abscence?.includes(AbsenceType_Techcode.NONE) && (entry.start >= mondayStart && entry.end <= sundayEnd);
    });
    return calculateHours(timetableEntries, staff, mondayStart, sundayEnd, false);
}



async function calculateThisMonthHours(staff: Staff) {
    const timetableEntries = staff.timetables.filter(timetable => {
        const date = new Date(timetable.date);
        return date.getMonth() == currentDate.getMonth() && timetable.abscence?.includes(AbsenceType_Techcode.NONE);
    });
    return calculateHours(timetableEntries, staff, undefined, undefined, true);
}

function calculateFlexTime(staff: Staff): number {
    const sollArbeitsStunden: number = staff.target_hours * 5 * 4; // Monatliche arbeitstunden
    let totalDifferenceOnPerformedHours: number = 0;
    for (const entry of staff.timetables) {
        const entryDate = new Date(entry.date);
        // Check if the entry is in the current month and year
        if (entryDate.getMonth() === currentDate.getMonth() && entryDate.getFullYear() === currentDate.getFullYear()) {
            totalDifferenceOnPerformedHours += entry.difference_performed_target;
        }
    }
    totalDifferenceOnPerformedHours += (staff.max_vacation_days / 12) * staff.target_hours;
    return Math.round((totalDifferenceOnPerformedHours - sollArbeitsStunden));
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////         Wrapper          ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getDashboardOrWorkTimeStatistics(req: Request, res: Response, dashboard: boolean = true) {
    try {
        const user = req.body.user;
        const staff = await getStaffByKey("staff_id", user.staff.staff_id);
        if (!staff) {
            console.error("No such staff!");
            console.error(`staffId was ${user.staff.staff_id}`);
            return;
        }
        await validateStaffTimeTableEntries(staff);
        const hoursThisWeek: number = await calculateHoursThisOrPreviousWeek(staff) ?? 0;
        if (dashboard) {
            const flexTime: number = calculateFlexTime(staff) ?? 0;
            let fTime = await FlexTime.findOne({
                relations: {
                    staff: true
                },
                where: {
                    staff: {
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
            const sickDays: number = staff.timetables.filter(entry => entry.abscence == AbsenceType_Techcode.SICK).length ?? 0;
            const remainingVacationDays: number = staff.max_vacation_days - (staff.timetables.filter(entry => entry.abscence == AbsenceType_Techcode.VACATION).length ?? 0);
            const dashboardStatistics = {
                flexTime: flexTime.toFixed(2),
                hoursThisWeek: hoursThisWeek.toFixed(2),
                sickDays: sickDays.toFixed(2),
                remainingVacationDays: remainingVacationDays.toFixed(2),
            }
            res.json(dashboardStatistics);
        } else {
            const hoursPreviousWeek: number = await calculateHoursThisOrPreviousWeek(staff, true) ?? 0;
            const hoursThisMonth: number = await calculateThisMonthHours(staff) ?? 0;
            const mustWorkHoursMonth: number = staff.target_hours * (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate() - staff.target_hours);
            const workTimeStatistics = {
                hoursThisWeek: hoursThisWeek.toFixed(2),
                hoursPreviousWeek: hoursPreviousWeek.toFixed(2),
                hoursThisMonth: hoursThisMonth.toFixed(2),
                mustWorkHoursMonth: mustWorkHoursMonth.toFixed(2),
            }
            res.json(workTimeStatistics);
        }
    } catch (error) {
        console.error("Error calculating dashboard statistics", error);
        res.status(500).json({message: "Error calculating dashboard statistics"});
    }
}
async function getVacationsOrSicknessStatistics(req: Request, res: Response, vacation: boolean = true) {
    try {
        const user = req.body.user;
        const staff = await getStaffByKey("staff_id", user.staff.staff_id);
        if (!staff) {
            console.error("No such staff!");
            console.error(`staffId was ${user.staff.staff_id}`);
            return;
        }
        let absences: Absence[] | undefined;
        if (vacation) {
            absences = await Absence.find({
                where: {
                    staff: {
                        staff_id: staff.staff_id
                    },
                    type_techcode: AbsenceType_Techcode.VACATION,
                }
            });
        } else {
            absences = await Absence.find({
                where: {
                    staff: {
                        staff_id: staff.staff_id
                    },
                    type_techcode: AbsenceType_Techcode.SICK,
                }
            });
        }
        if (!absences) {
            console.error("No Absences found");
            return;
        }
        if (vacation) {
            const vacationStatistics = {
                maxAllowedVacationDays: staff.max_vacation_days,
                unplannedVacationDays: staff.max_vacation_days - absences.filter(absence => absence.permission_status == PermissionStatusTechcode.AKNOWLEDGED || PermissionStatusTechcode.APPROVED).length,
                takenVacationDays: staff.max_vacation_days - absences.filter(absence => absence.permission_status == PermissionStatusTechcode.APPROVED).length,
                deniedVacationDays: absences.filter(absence => absence.permission_status == PermissionStatusTechcode.REJECTED).length
            }
            res.json(vacationStatistics);
        } else {
            const lastMonthDateStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
            const lastMonthDateEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            const currentMonthDateStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const currentMonthDateEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

            const sicknessLastMonth = absences.filter(
                absence => absence.start_time >= lastMonthDateStart && absence.end_time <= lastMonthDateEnd
            );
            const sicknessThisMonth = absences.filter(
                absence => absence.start_time >= currentMonthDateStart && absence.end_time <= currentMonthDateEnd
            );

            let hoursLastMonth = 0;
            for (const entry of sicknessLastMonth) {
                const durationInHours = (entry.end_time.getTime() - entry.start_time.getTime()) / (60 * 60 * 1000);
                hoursLastMonth += durationInHours;
            }
            let hoursThisMonth = 0;
            for (const entry of sicknessThisMonth) {
                const durationInHours = (entry.end_time.getTime() - entry.start_time.getTime()) / (60 * 60 * 1000);
                hoursThisMonth += durationInHours;
            }
            const sicknessStatistics = {
                sicknessLastMonth: hoursLastMonth / 24, // days
                sicknessThisMonth: hoursThisMonth / 24  // days
            };
            res.json(sicknessStatistics);
        }
    } catch (error) {
        console.error("Error calculating vacation/sickness statistics", error);
        res.status(500).json({message: "Error calculating vacation/sickness statistics"});
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////         Routes          ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/dashboard", authenticate, async (req: Request, res: Response) => {
    await getDashboardOrWorkTimeStatistics(req, res);
});
router.get("/worktime", authenticate, async (req: Request, res: Response) => {
    await getDashboardOrWorkTimeStatistics(req, res, false);
});
router.get("/vacations", authenticate, async (req: Request, res: Response) => {
    await getVacationsOrSicknessStatistics(req, res);
});
router.get("/sickness", authenticate, async (req: Request, res: Response) => {
    await getVacationsOrSicknessStatistics(req,  res,  false);
});
export default router;