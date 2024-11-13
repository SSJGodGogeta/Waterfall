import {User} from "../../DB/Entities/User.js";

export let userCache: User[]|null = null;
export async function getUsersFromDBOrCache(): Promise<User[] | null>  {
    if (userCache) {
        // Return cached data if available
        console.log("Using Cache for table: User");
    }
    else {
        try {
            userCache = (await User.find({
                relations: {
                    staff: {
                        role: {
                            privilege: true,
                        },
                        group:true,
                    }
                }
            }));
        } catch (error) {
            console.error("Error fetching User:", error);
        }
    }
    return userCache;
}
/**
 * Returns one User from the DB that matches the keyValue.
 * If only one exists, returns that.
 * If many exist, returns the first to match the keyValue.
 * If none exist, returns undefined.
 * @param keyName
 * @param keyValue
 */
export async function getUserByKey<K extends keyof User>(keyName: K, keyValue: User[K]): Promise<User | undefined> {
    const users = await getUsersFromDBOrCache();
    if (!users) return undefined;
    return users.find(user => user[keyName] === keyValue);
}

export function clearUserCache() {
    userCache = null;
    console.log("Clearing User cache");
}