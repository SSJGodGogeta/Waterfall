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

/**
 * Returns one Privilege from the DB that matches the keyValue.
 * If only one exists, returns that.
 * If many exist, returns the first to match the keyValue.
 * If none exist, returns undefined.
 * @param keyName
 * @param keyValue
 */
export async function getPrivilegeByKey<K extends keyof Privilege>(keyName: K, keyValue: Privilege[K]): Promise<Privilege | undefined> {
    const privileges = await getPrivilegeFromDBOrCache();
    if (!privileges) return undefined;
    return privileges.find(privilege => privilege[keyName] === keyValue);
}

export function clearPrivilegeCache() {
    priviligeCache = null;
    console.log("Clearing Privilege cache");
}