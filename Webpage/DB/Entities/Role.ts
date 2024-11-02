import { Entity, Column, ManyToOne, OneToMany, JoinColumn, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import type { Privilege } from "./Privilege.js";
import type { Staff } from "./Staff.js";

// Role Entity
@Entity('role')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "role_id" })
    role_id!: number;

    @Column({ length: 45 })
    role_name!: string;

    @ManyToOne('Privilege', (privilege: Privilege) => privilege.roles)
    @JoinColumn({
        name: 'privilege_privilege_id', // This is necessary to specify the foreign key column
        referencedColumnName: 'privilege_id',
        foreignKeyConstraintName: 'fk_role_privilege1'
    })
    privilege!: Privilege;

    @OneToMany('Staff', (staff: Staff) => staff.role)
    staff?: Staff[];
}
