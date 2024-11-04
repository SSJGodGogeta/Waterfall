import {Role} from "../../DB/Entities/Role.js";

export let rolesCache: Role[]|null = null;
export async function getRolesFromDBOrCache(): Promise<Role[] | null>  {
    if (rolesCache) {
        // Return cached data if available
        console.log("Using Cache for table: Role");
    }
    else {
        try {
            rolesCache = (await Role.find({
                relations: {
                    privilege:true,
                    staff: true
                }
            }));
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    }
    return rolesCache;
}
export function clearRolesCache() {
    rolesCache = null;
    console.log("Clearing roles cache");
}