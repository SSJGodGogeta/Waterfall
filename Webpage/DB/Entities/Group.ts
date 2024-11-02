import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany, BaseEntity,
} from 'typeorm';
import type {Staff} from "./Staff.js";

// Group Entity
@Entity('group')
export class Group extends BaseEntity{
    @PrimaryGeneratedColumn()
    group_id!: number;

    @Column({ length: 45 })
    group_name!: string;

    @OneToMany('Staff', (staff:Staff) => staff.group)
    staff?: Staff[];
}
