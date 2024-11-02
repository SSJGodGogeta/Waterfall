import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn, BaseEntity, PrimaryColumn,
} from 'typeorm';
import type {Privilege} from "./Privilege.js";
import type {Staff} from "./Staff.js";

// Role Entity
@Entity('role')
export class Role extends BaseEntity{
    @PrimaryColumn({ name: "role_id" })
    role_id!: number;

    @Column({ length: 45 })
    role_name!: string;

    @ManyToOne('Privilege', (privilege:Privilege) => privilege.roles)
    @JoinColumn({ name: 'privilege_privilege_id' })
    privilege!: Privilege;

    @OneToMany('Staff', (staff:Staff) => staff.role)
    staff?: Staff[];
}