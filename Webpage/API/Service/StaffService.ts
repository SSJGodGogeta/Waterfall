import {Staff} from "../../DB/Entities/Staff.js";

export let staffCache: Staff[]|null = null;
export async function getStaffFromDBOrCache(): Promise<Staff[] | null>  {
    if (staffCache) {
        // Return cached data if available
        console.log("Using Cache for table: Staff");
    }
    else {
        try {
            staffCache = (await Staff.find({
                relations: {
                    group: true,
                    user: true,
                    role: true,
                    project: true,
                    flexTimes:true,
                    absences:true,
                    timetables:true
                }
            }));
        } catch (error) {
            console.error("Error fetching Staff:", error);
        }
    }
    return staffCache;
}
export function clearStaffCache() {
    staffCache = null;
    console.log("Clearing Staff cache");
}
