import {IStaff} from "./IStaff";
import {IPrivilege} from "./IPrivilege";

export interface IRole {
    role_id: number;
    role_name: string;
    privilege: IPrivilege[];
    staff: IStaff[];
}