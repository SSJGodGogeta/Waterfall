// Calculate hours/days/weeks of worktimes/breaks/vacation/sickness/flex time
import {Staff} from "../DB/Entities/Staff.js";
import {AbsenceType_Techcode} from "../DB/Techcodes/AbsenceType_Techcode.js";
import {dataSource} from "../DB/dataSource.js";

async function calculateSickDays(staffId:number): Promise<number | null> {
    const staff = await Staff.findOne({
        relations: {
            timetables: true
        },
        where: {
            staff_id: staffId,
            timetables: {
                abscence: AbsenceType_Techcode.SICK
            }
        },
    });
    if (!staff) {
        console.log("No such staff");
        return null;
    }
    // Has table entries where Arman is sick
    const timetableEntries = staff.timetables;
    return timetableEntries.length;
}
async function calculateRemainingVacationDays(staffId:number): Promise<number | null> {
    const staff = await Staff.findOne({
        relations: {
            timetables: true
        },
        where: {
            staff_id: staffId,
            timetables: {
                abscence: AbsenceType_Techcode.VACATION
            }
        },
    });
    if (!staff) {
        console.log("No such staff");
        return null;
    }
    // Has table entries where Arman is sick
    const timetableEntries = staff.timetables;
    return staff.max_vacation_days-timetableEntries.length;
}
async function calculateHoursThisWeek(staffId: number): Promise<number | null> {
    // Get the current date and calculate the start and end of this week
    const currentDate:Date = new Date();
    const dayOfWeek:number = currentDate.getDay();
    const daysToMonday:number = (dayOfWeek + 6) % 7; // Get number of days to Monday
    const mondayStart:Date = new Date(currentDate);
    mondayStart.setDate(currentDate.getDate() - daysToMonday); // Set to Monday

    const sundayEnd = new Date(mondayStart);
    sundayEnd.setDate(mondayStart.getDate() + 6); // Set to Sunday
    const staff = await Staff.findOne({
        relations: {
            timetables: true,
        },
        where: {
            staff_id: staffId,
        },
    });

    if (!staff) {
        console.log("No such staff");
        return null;
    }

    // Filter the timetable entries for this week
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
        const workedHours = (workedMinutes - timetableEntry.pause_minutes) / 60;
        performedHoursThisWeek += workedHours;
    }
    return performedHoursThisWeek;
}
// runs all the code
async function main() {
    await dataSource.initialize();
    console.warn("Sick days: " + await calculateSickDays(5));
    console.warn("Remaining vacation days: " + await calculateRemainingVacationDays(5));
    console.warn("Hours this week: " + await calculateHoursThisWeek(5));
}

await main();

export {}