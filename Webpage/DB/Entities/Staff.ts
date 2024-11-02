import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn, BaseEntity,
} from 'typeorm';
import type {Group} from "./Group.js";
import type {User} from "./User.js";
import type {Role} from "./Role.js";
import type {FlexTime} from "./FlexTime.js";
import type {Absence} from "./Absence.js";
import type {Timetable} from "./TimeTable.js";

// Staff Entity
@Entity('staff')
export class Staff extends BaseEntity{
    @PrimaryGeneratedColumn()
    staff_id!: number;

    @Column({ length: 50 })
    first_name!: string;

    @Column({ length: 45 })
    last_name!: string;

    @Column({ type: 'double', nullable: true })
    target_hours?: number;

    @Column({ type: 'double', nullable: true })
    salary_euro?: number;

    @Column({ type: 'int', nullable: true })
    max_vacation_days?: number;

    @ManyToOne('Group', (group:Group) => group.staff)
    @JoinColumn({ name: 'group_group_id' })
    group!: Group;

    @ManyToOne('User', (user:User) => user.staff)
    @JoinColumn({ name: 'user_user_id' })
    user!: User;

    @ManyToOne('Role', (role:Role) => role.staff)
    @JoinColumn({ name: 'role_role_id' })
    role!: Role;

    @Column({ type: 'int', nullable: true })
    supervisor_id?: number;

    @OneToMany('FlexTime', (flexTime:FlexTime) => flexTime.staff)
    flexTimes?: FlexTime[];

    @OneToMany('Absence', (absence:Absence) => absence.staff)
    absences?: Absence[];

    @OneToMany('Timetable', (timetable:Timetable) => timetable.staff)
    timetables?: Timetable[];
}