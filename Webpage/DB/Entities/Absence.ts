import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn, BaseEntity, PrimaryColumn,
} from 'typeorm';
import type {Staff} from "./Staff.js";

// Absence Entity
@Entity('absence')
export class Absence extends BaseEntity{
    @PrimaryColumn({ name: "absence_id" })
    absence_id!: number;

    @Column({ type: 'datetime', nullable: true })
    start_time?: Date;

    @Column({ type: 'datetime', nullable: true })
    end_time?: Date;

    @Column({ length: 45, nullable: true })
    permission_status?: string;

    @Column({ length: 45 })
    type_techcode!: string;

    @ManyToOne('Staff', (staff:Staff) => staff.absences)
    @JoinColumn({ name: 'staff_staff_id' })
    staff!: Staff;
}