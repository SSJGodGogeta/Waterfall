import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn, BaseEntity,
} from 'typeorm';
import {Privilege} from "./Privilege";
import {Staff} from "./Staff";

// Role Entity
@Entity('role')
export class Role extends BaseEntity{
    @PrimaryGeneratedColumn()
    role_id!: number;

    @Column({ length: 45 })
    role_name!: string;

    @ManyToOne(() => Privilege, (privilege) => privilege.roles)
    @JoinColumn({ name: 'privilege_privilege_id' })
    privilege!: Privilege;

    @OneToMany(() => Staff, (staff) => staff.role)
    staff?: Staff[];
}