import {IRole} from "./IRole";

export interface IPrivilege {
    privilege_id: number;
    privilege_techcode: string;
    roles?: IRole[];
}