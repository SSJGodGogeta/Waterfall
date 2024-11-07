import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany, BaseEntity
} from 'typeorm';
import type {Role} from "./Role.js";
import {Privilige_Techcode} from "../Techcodes/Privilige_Techcode.js";


// Privilege Entity
@Entity('privilege')
export class Privilege extends BaseEntity{
    @PrimaryGeneratedColumn()
    privilege_id!: number;

    @Column({ length: 45 })
    privilege_techcode!: Privilige_Techcode;

    @OneToMany('Role', (role:Role) => role.privilege)
    roles?: Role[];
}
