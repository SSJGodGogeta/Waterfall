import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn, BaseEntity,
} from 'typeorm';
import {Staff} from "./Staff.js";

// Absence Entity
@Entity('absence')
export class Absence extends BaseEntity{
    @Column({ type: 'datetime', nullable: true })
    start_time?: Date;

    @Column({ type: 'datetime', nullable: true })
    end_time?: Date;

    @Column({ length: 45, nullable: true })
    permission_status?: string;

    @Column({ length: 45 })
    type_techcode!: string;

    @ManyToOne(() => Staff, (staff) => staff.absences)
    @JoinColumn({ name: 'staff_staff_id' })
    staff!: Staff;
}