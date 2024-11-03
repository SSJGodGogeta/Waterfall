import {IStaff} from "./IStaff";
import {IStaffGroup} from "./IStaffGroup";

export interface IProject {
    project_id: number;
    project_name: string;
    project_description: string;
    project_due_date: Date;
    group: IStaffGroup;
    assigned_staff_to_project: IStaff[];
    assignedGroups: IStaffGroup[];
}