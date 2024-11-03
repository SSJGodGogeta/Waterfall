import {IStaff} from "./IStaff";

export interface ITimeTable {
    index: string;
    date: Date;
    weekday: string;
    start: Date;
    end: Date;
    pause_minutes: number;
    performed_hours: number;
    difference_performed_target: number;
    abscence: string;
    staff: IStaff;
}