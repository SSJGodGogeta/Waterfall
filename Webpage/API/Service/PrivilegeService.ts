import {Privilege} from "../../DB/Entities/Privilege.js";

export let priviligeCache: Privilege[]|null = null;
export async function getPrivilegeFromDBOrCache(): Promise<Privilege[] | null>  {
    if (priviligeCache) {
        // Return cached data if available
        console.log("Using Cache for table: Privilege");
    }
    else {
        try {
            priviligeCache = (await Privilege.find({
                relations: {
                    roles:{
                        staff:true,
                    }
                }
            }));
        } catch (error) {
            console.error("Error fetching Privilege:", error);
        }
    }
    return priviligeCache;
}
export function clearPrivilegeCache() {
    priviligeCache = null;
    console.log("Clearing Privilege cache");
}
