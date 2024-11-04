import {FlexTime} from "../../DB/Entities/FlexTime.js";

export let flexTimeCache: FlexTime[]|null = null;
export async function getFlexTimeFromDBOrCache(): Promise<FlexTime[] | null>  {
    if (flexTimeCache) {
        // Return cached data if available
        console.log("Using Cache for table: FlexTime");
    }
    else {
        try {
            flexTimeCache = (await FlexTime.find({
                relations: {
                    staff: true
                }
            }));
        } catch (error) {
            console.error("Error fetching flexTimes:", error);
        }
    }
    return flexTimeCache;
}
export function clearFlexTimeCache() {
    flexTimeCache = null;
    console.log("Clearing flexTime cache");
}
