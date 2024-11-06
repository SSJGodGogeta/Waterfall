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
/**
 * Returns one Role from the DB that matches the keyValue.
 * If only one exists, returns that.
 * If many exist, returns the first to match the keyValue.
 * If none exist, returns undefined.
 * @param keyName
 * @param keyValue
 */
export async function getRoleByKey<K extends keyof Role>(keyName: K, keyValue: Role[K]): Promise<Role | undefined> {
    const roles = await getRolesFromDBOrCache();
    if (!roles) return undefined;
    return roles.find(role => role[keyName] === keyValue);
}

export function clearRolesCache() {
    rolesCache = null;
    console.log("Clearing roles cache");
}