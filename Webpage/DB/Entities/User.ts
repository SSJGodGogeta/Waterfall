import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique, BaseEntity, OneToOne
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

    @Column({ type: 'timestamp' })
    login_timeStamp!: Date;

    @Column({ length: 200 })
    user_password!: string;

    @Column({ length: 255})
    user_token?: string;

    @OneToOne('Staff', (staff:Staff) => staff.user)
    staff?: Staff;
}