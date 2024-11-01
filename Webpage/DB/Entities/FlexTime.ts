import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn, BaseEntity,
} from 'typeorm';
import {Staff} from "./Staff";

// FlexTime Entity
@Entity('flex_time')
export class FlexTime extends BaseEntity{
    @Column({ type: 'double', nullable: true })
    available_flextime?: number;

    @Column({ length: 45, nullable: true })
    flex_time_techcode?: string;

    @ManyToOne(() => Staff, (staff) => staff.flexTimes)
    @JoinColumn({ name: 'staff_staff_id' })
    staff!: Staff;
}
