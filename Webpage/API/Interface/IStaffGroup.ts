import {IProject} from "./IProject";
import {IStaff} from "./IStaff";

export interface IStaffGroup {
    group_id: number;
    group_name: string;
    projects: IProject[];
    staff_members: IStaff[];
    projectGroups: IProject[];
}