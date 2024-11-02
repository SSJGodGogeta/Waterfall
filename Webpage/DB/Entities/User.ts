import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Unique, BaseEntity,
} from 'typeorm';
import type {Staff} from "./Staff.js";
// User Entity
@Entity('user')
@Unique(['user_email'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    user_id!: number;

    @Column({ length: 75 })
    user_email!: string;

    @Column({ length: 45 })
    user_salt!: string;

    @Column({ length: 200 })
    user_password!: string;

    @OneToMany('Staff', (staff:Staff) => staff.user)
    staff?: Staff[];
}