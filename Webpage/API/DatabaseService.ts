import {Role} from "../DB/Entities/Role.js";
import {Absence} from "../DB/Entities/Absence.js";
import {FlexTime} from "../DB/Entities/FlexTime.js";
import {StaffGroup} from "../DB/Entities/Group.js";
import {Privilege} from "../DB/Entities/Privilege.js";
import {Project} from "../DB/Entities/Project.js";
import {Staff} from "../DB/Entities/Staff.js";
import {Timetable} from "../DB/Entities/TimeTable.js";
import {User} from "../DB/Entities/User.js";

// Purpose of these methods is a simple cache. You can either load everything on startup which is not recommended as it will cost u some load time
// However, u will have everything in cache afterwards which might help you later. I would recommend loading the entity that u need into cache. using it then as u need.
// If u update  the entities table (change a row or delete it), then u always need to clear and refresh the cache !!


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

export let flexTimeCache: FlexTime[]|null = null;
export async function getFlexTimeFromDBOrCache(): Promise<FlexTime[] | null>  {
    if (flexTimeCache) {
        // Return cached data if available
        console.log("Using Cache for table: FlexTime");
    }
    else {
        try {
            flexTimeCache = (await FlexTime.find({
                relations: {
                    staff: true
                }
            }));
        } catch (error) {
            console.error("Error fetching flexTimes:", error);
        }
    }
    return flexTimeCache;
}
export function clearFlexTimeCache() {
    flexTimeCache = null;
    console.log("Clearing flexTime cache");
}

export let groupCache: StaffGroup[]|null = null;
export async function getStaffGroupFromDBOrCache(): Promise<StaffGroup[] | null>  {
    if (groupCache) {
        // Return cached data if available
        console.log("Using Cache for table: StaffGroup");
    }
    else {
        try {
            groupCache = (await StaffGroup.find({
                relations: {
                    staff_members: true,
                    projects: true,
                    projectGroups: true
                }
            }));
        } catch (error) {
            console.error("Error fetching staffGroups:", error);
        }
    }
    return groupCache;
}
export function clearStaffGroupCache() {
    groupCache = null;
    console.log("Clearing staffGroup cache");
}


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

export let staffCache: Staff[]|null = null;
export async function getStaffFromDBOrCache(): Promise<Staff[] | null>  {
    if (staffCache) {
        // Return cached data if available
        console.log("Using Cache for table: Staff");
    }
    else {
        try {
            staffCache = (await Staff.find({
                relations: {
                   group: true,
                    user: true,
                    role: true,
                    project: true,
                    flexTimes:true,
                    absences:true,
                    timetables:true
                }
            }));
        } catch (error) {
            console.error("Error fetching Staff:", error);
        }
    }
    return staffCache;
}
export function clearStaffCache() {
    staffCache = null;
    console.log("Clearing Staff cache");
}

export let timeTableCache: Timetable[]|null = null;
export async function getTimetableFromDBOrCache(): Promise<Timetable[] | null>  {
    if (timeTableCache) {
        // Return cached data if available
        console.log("Using Cache for table: Timetable");
    }
    else {
        try {
            timeTableCache = (await Timetable.find({
                relations: {
                    staff:true
                }
            }));
        } catch (error) {
            console.error("Error fetching Timetable:", error);
        }
    }
    return timeTableCache;
}
export function clearTimetableCache() {
    timeTableCache = null;
    console.log("Clearing Timetable cache");
}

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