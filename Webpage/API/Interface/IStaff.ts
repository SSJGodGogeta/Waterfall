import type {StaffGroup} from "../../DB/Entities/Group";
import {IUser} from "./IUser";
import {IRole} from "./IRole";
import {IProject} from "./IProject";
import {IFlexTime} from "./IFlexTime";
import {IAbsence} from "./IAbsence";

export interface IStaff {
    staff_id: number;
    first_name: string;
    last_name: string;
    target_hours: number;
    salary_euro: number;
    max_vacation_days: number;
    supervisor_id: number;
    group: StaffGroup;
    user: IUser;
    role: IRole;
    project: IProject;
    flexTimes: IFlexTime[];
    absences: IAbsence[];
}