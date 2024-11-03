import {Role} from "../../DB/Entities/Role.js";
import {IRole} from "../Interface/IRole";

export let rolesCache: IRole[]|null = null;
export async function getRolesFromDBOrCache(): Promise<IRole[] | null>  {
    if (rolesCache) {
        // Return cached data if available
        console.log("Serving roles from cache");
    }
    else {
        try {
            const roles = (await Role.find({
                relations: {
                    privilege:true,
                    staff: true
                }
            }));
            rolesCache = roles as unknown as IRole[];

        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    }
    return rolesCache;
}

export function clearRolesCache() {
    rolesCache = null;
}