import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn, BaseEntity, OneToOne,
} from 'typeorm';
import type {StaffGroup} from "./Group.js";
import type {User} from "./User.js";
import type {Role} from "./Role.js";
import type {FlexTime} from "./FlexTime.js";
import type {Absence} from "./Absence.js";
import type {Timetable} from "./TimeTable.js";
import type {Project} from "./Project.js";

// Staff Entity
@Entity('staff')
export class Staff extends BaseEntity{
    @PrimaryGeneratedColumn()
    staff_id!: number;

    @Column({ length: 50 })
    first_name!: string;

    @Column({ length: 45 })
    last_name!: string;

    @Column({ type: 'double', nullable: false })
    target_hours!: number;

    @Column({ type: 'double', nullable: false })
    salary_euro!: number;

    @Column({ type: 'int', nullable: false })
    max_vacation_days!: number;

    @Column({ type: 'int', nullable: false })
    supervisor_id!: number;

    @ManyToOne('StaffGroup', (group:StaffGroup) => group.staff_members)
    @JoinColumn({
        name: 'group_group_id',
        referencedColumnName: 'group_id',
        foreignKeyConstraintName: 'fk_staff_group1'
    })
    group!: StaffGroup;

    @OneToOne('User', (user:User) => user.staff)
    @JoinColumn({
        name: 'user_user_id',
        referencedColumnName: 'user_id',
        foreignKeyConstraintName: 'fk_staff_user1'
    })
    user!: User;

    @ManyToOne('Role', (role:Role) => role.staff)
    @JoinColumn({
        name: 'role_role_id',
        referencedColumnName: 'role_id',
        foreignKeyConstraintName: 'fk_staff_role1'
    })
    role!: Role;

    @ManyToOne('Project', (project:Project) => project.assigned_staff_to_project)
    @JoinColumn({
        name: 'project_project_id',
        referencedColumnName: 'project_id',
        foreignKeyConstraintName: 'fk_staff_project1'
    })
    project?: Project;


    @OneToMany('FlexTime', (flexTime:FlexTime) => flexTime.staff)
    flexTimes?: FlexTime[];

    // In Staff Entity
    @OneToMany('Absence', (absence: Absence) => absence.staff)
    absences?: Absence[];


    @OneToMany('Timetable', (timetable:Timetable) => timetable.staff)
    timetables!: Timetable[];
}