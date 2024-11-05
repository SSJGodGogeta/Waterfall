import {Project} from "../../DB/Entities/Project.js";

export let projectCache: Project[]|null = null;
export async function getProjectFromDBOrCache(): Promise<Project[] | null>  {
    if (projectCache) {
        // Return cached data if available
        console.log("Using Cache for table: Project");
    }
    else {
        try {
            projectCache = (await Project.find({
                relations: {
                    group:true,
                    assignedGroups: true,
                    assigned_staff_to_project:true
                }
            }));
        } catch (error) {
            console.error("Error fetching Project:", error);
        }
    }
    return projectCache;
}
/**
 * Returns one Project from the DB that matches the keyValue.
 * If only one exists, returns that.
 * If many exist, returns the first to match the keyValue.
 * If none exist, returns undefined.
 * @param keyName
 * @param keyValue
 */
export async function getProjectByKey<K extends keyof Project>(keyName: K, keyValue: Project[K]): Promise<Project | undefined> {
    const projects = await getProjectFromDBOrCache();
    if (!projects) return undefined;
    return projects.find(project => project[keyName] === keyValue);
}

export function clearProjectCache() {
    projectCache = null;
    console.log("Clearing Project cache");
}
