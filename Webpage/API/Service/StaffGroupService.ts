import {StaffGroup} from "../../DB/Entities/Group.js";
export let groupCache: StaffGroup[]|null = null;
export async function getStaffGroupFromDBOrCache(): Promise<StaffGroup[] | null>  {
    if (groupCache) {
        // Return cached data if available
        console.log("Using Cache for table: StaffGroup");
    }
    else {
        try {
            groupCache = (await StaffGroup.find({
                relations: {
                    staff_members: true,
                    projects: true,
                    projectGroups: true
                }
            }));
        } catch (error) {
            console.error("Error fetching staffGroups:", error);
        }
    }
    return groupCache;
}
/**
 * Returns one StaffGroup from the DB that matches the keyValue.
 * If only one exists, returns that.
 * If many exist, returns the first to match the keyValue.
 * If none exist, returns undefined.
 * @param keyName
 * @param keyValue
 */
export async function getStaffGroupByKey<K extends keyof StaffGroup>(keyName: K, keyValue: StaffGroup[K]): Promise<StaffGroup | undefined> {
    const staffGroups = await getStaffGroupFromDBOrCache();
    if (!staffGroups) return undefined;
    return staffGroups.find(staffGroup => staffGroup[keyName] === keyValue);
}

export function clearStaffGroupCache() {
    groupCache = null;
    console.log("Clearing staffGroup cache");
}
