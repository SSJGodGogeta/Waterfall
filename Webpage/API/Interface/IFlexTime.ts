import {IStaff} from "./IStaff";

export interface IFlexTime {
    flex_time_id: number;
    available_flextime: number;
    flex_time_techcode: string;
    staff: IStaff;
}