import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn, BaseEntity,
} from 'typeorm';
import {Group} from "./Group.js";
import {User} from "./User.js";
import {Role} from "./Role.js";
import {FlexTime} from "./FlexTime.js";
import {Absence} from "./Absence.js";
import {Timetable} from "./TimeTable.js";

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

    @ManyToOne(() => Group, (group) => group.staff)
    @JoinColumn({ name: 'group_group_id' })
    group!: Group;

    @ManyToOne(() => User, (user) => user.staff)
    @JoinColumn({ name: 'user_user_id' })
    user!: User;

    @ManyToOne(() => Role, (role) => role.staff)
    @JoinColumn({ name: 'role_role_id' })
    role!: Role;

    @Column({ type: 'int', nullable: true })
    supervisor_id?: number;

    @OneToMany(() => FlexTime, (flexTime) => flexTime.staff)
    flexTimes?: FlexTime[];

    @OneToMany(() => Absence, (absence) => absence.staff)
    absences?: Absence[];

    @OneToMany(() => Timetable, (timetable) => timetable.staff)
    timetables?: Timetable[];
}