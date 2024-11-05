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
/**
 * Returns one Staff from the DB that matches the keyValue.
 * If only one exists, returns that.
 * If many exist, returns the first to match the keyValue.
 * If none exist, returns undefined.
 * @param keyName
 * @param keyValue
 */
export async function getStaffByKey<K extends keyof Staff>(keyName: K, keyValue: Staff[K]): Promise<Staff | undefined> {
    const staffs = await getStaffFromDBOrCache();
    if (!staffs) return undefined;
    return staffs.find(staff => staff[keyName] === keyValue);
}

export function clearStaffCache() {
    staffCache = null;
    console.log("Clearing Staff cache");
}
