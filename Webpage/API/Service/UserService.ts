import {User} from "../../DB/Entities/User.js";

export let userCache: User[]|null = null;
export async function getUserFromDBOrCache(): Promise<User[] | null>  {
    if (userCache) {
        // Return cached data if available
        console.log("Using Cache for table: User");
    }
    else {
        try {
            userCache = (await User.find({
                relations: {
                    staff:true
                }
            }));
        } catch (error) {
            console.error("Error fetching User:", error);
        }
    }
    return userCache;
}
export function clearUserCache() {
    userCache = null;
    console.log("Clearing User cache");
}