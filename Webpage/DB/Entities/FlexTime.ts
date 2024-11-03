import { Entity, Column, ManyToOne, JoinColumn, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import type { Staff } from './Staff.js';

// FlexTime Entity
@Entity('flex_time')
export class FlexTime extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "flex_time_id" })  // Primary key with auto-increment
    flex_time_id!: number;

    @Column({ type: 'double', nullable: true })
    available_flextime?: number;

    @Column({ length: 45, nullable: true })
    flex_time_techcode?: string;

    // Define Many-to-One relationship to Staff
    @ManyToOne('Staff', (staff: Staff) => staff.flexTimes)
    @JoinColumn({
        name: 'staff_staff_id', // Foreign key column in FlexTime table
        referencedColumnName: 'staff_id',
        foreignKeyConstraintName: 'fk_flex_time_staff1',
    })
    staff!: Staff;
}
