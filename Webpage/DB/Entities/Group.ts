import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany, BaseEntity,
} from 'typeorm';
import {Staff} from "./Staff.js";

// Group Entity
@Entity('group')
export class Group extends BaseEntity{
    @PrimaryGeneratedColumn()
    group_id!: number;

    @Column({ length: 45 })
    group_name!: string;

    @OneToMany(() => Staff, (staff) => staff.group)
    staff?: Staff[];
}
