import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn, BaseEntity, PrimaryColumn,
} from 'typeorm';
import type {Staff} from "./Staff.js";
import {AbsenceType_Techcode} from "../Techcodes/AbsenceType_Techcode.js";

// Absence Entity
@Entity('absence')
export class Absence extends BaseEntity{
    @PrimaryColumn({ name: "absence_id" })
    absence_id!: number;

    @Column({ type: 'datetime', nullable: false })
    start_time!: Date;

    @Column({ type: 'datetime', nullable: false })
    end_time!: Date;

    @Column({ length: 45, nullable: false })
    permission_status!: string;

    @Column({ length: 45, nullable: false })
    type_techcode!: AbsenceType_Techcode;

    @ManyToOne('Staff', (staff:Staff) => staff.absences)
    @JoinColumn({
        name: 'staff_staff_id',
        referencedColumnName: 'staff_id',
        foreignKeyConstraintName: 'fk_absence_staff1'
    })
    staff!: Staff;
}