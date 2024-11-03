import {IStaff} from "./IStaff";

export interface IAbsence {
    absence_id: number;
    start_time: Date;
    end_time: Date;
    permission_status: string;
    type_techcode: string;
    staff: IStaff;
}