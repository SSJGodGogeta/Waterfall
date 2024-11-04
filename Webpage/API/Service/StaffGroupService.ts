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
export function clearStaffGroupCache() {
    groupCache = null;
    console.log("Clearing staffGroup cache");
}
