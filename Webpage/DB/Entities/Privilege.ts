import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany, BaseEntity
} from 'typeorm';
import type {Role} from "./Role.js";


// Privilege Entity
@Entity('privilege')
export class Privilege extends BaseEntity{
    @PrimaryGeneratedColumn()
    privilege_id!: number;

    @Column({ length: 45 })
    privilege_techcode!: string;

    @OneToMany('Role', (role:Role) => role.privilege)
    roles?: Role[];
}
