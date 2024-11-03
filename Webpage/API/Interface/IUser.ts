import {IStaff} from "./IStaff";

export interface IUser {
    user_id: number;
    user_email: string;
    user_salt: string;
    user_password: string;
    staff: IStaff;
}