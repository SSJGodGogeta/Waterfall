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
export function clearProjectCache() {
    projectCache = null;
    console.log("Clearing Project cache");
}
