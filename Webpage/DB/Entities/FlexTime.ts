import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity, PrimaryColumn,
} from 'typeorm';
import type { Staff } from './Staff.js';

// FlexTime Entity
@Entity('flex_time')
export class FlexTime extends BaseEntity {
    @PrimaryColumn({ name: "flex_time_id" })
    flex_time_id!: number;

    @Column({ type: 'double', nullable: true })
    available_flextime?: number;

    @Column({ length: 45, nullable: true })
    flex_time_techcode?: string;

    // Use a function to import the Staff class
    @ManyToOne('Staff', (staff:Staff) => staff.flexTimes)
    @JoinColumn({ name: 'staff_staff_id' })
    staff!: Staff;
}
