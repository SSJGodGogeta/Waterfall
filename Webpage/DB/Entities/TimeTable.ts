import {
    Entity,
    Column,
    BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import type {Staff} from "./Staff.js";
import {AbsenceType_Techcode} from "../Techcodes/AbsenceType_Techcode.js";


// Timetable Entity
@Entity('timetable')
export class Timetable extends BaseEntity{
    @PrimaryGeneratedColumn()
    index!: string;

    @Column({ type: 'date' })
    date!: Date;

    @Column({ length: 20 })
    weekday!: string;

    @Column({ type: 'datetime' })
    start!: Date;

    @Column({ type: 'datetime' })
    end!: Date;

    @Column({ type: 'int' })
    pause_minutes!: number;

    @Column({ type: 'double' })
    performed_hours!: number;

    @Column({ type: 'double' })
    difference_performed_target!: number;

    @Column({ length: 45, nullable: true })
    abscence?: AbsenceType_Techcode;

    @ManyToOne('Staff', (staff:Staff) => staff.timetables)
    @JoinColumn({
        name: 'staff_id',
        referencedColumnName: 'staff_id',
        foreignKeyConstraintName: 'fk_timetable_staff'
    })
    staff!: Staff;
}
