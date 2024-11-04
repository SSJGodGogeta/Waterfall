import {Absence} from "../../DB/Entities/Absence.js";

export let absenceCache: Absence[]|null = null;
export async function getAbsenceFromDBOrCache(): Promise<Absence[] | null>  {
    if (absenceCache) {
        // Return cached data if available
        console.log("Using Cache for table: Absence");
    }
    else {
        try {
            absenceCache = (await Absence.find({
                relations: {
                    staff: true
                }
            }));
        } catch (error) {
            console.error("Error fetching absence:", error);
        }
    }
    return absenceCache;
}
export function clearAbsenceCache() {
    absenceCache = null;
    console.log("Clearing absence cache");
}