// Calculate hours/days/weeks of worktimes/breaks/vacation/sickness/flex time
import {Staff} from "../DB/Entities/Staff.js";
import {AbsenceType_Techcode} from "../DB/Techcodes/AbsenceType_Techcode.js";
import {dataSource} from "../DB/dataSource.js";

async function calculateSickDays(){
    const staff = await Staff.findOne({
        relations: {
            timetables: true
        },
        where: {
            staff_id: 5,
            timetables: {
                abscence: AbsenceType_Techcode.SICK
            }
        },
    });
    console.log(staff);
}


// runs all the code
async function main() {
    await dataSource.initialize();
    await calculateSickDays();
}

await main();

export {}