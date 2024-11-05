import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    BaseEntity,
    JoinColumn,
    ManyToOne, OneToMany
} from 'typeorm';
import type { StaffGroup } from './Group.js';
import type {Staff} from "./Staff.js";

@Entity('project')
export class Project extends BaseEntity {
    @PrimaryGeneratedColumn()
    project_id!: number;

    @Column({ length: 45 })
    project_name!: string;

    @Column({ length: 250, nullable: true })
    project_description?: string;

    @Column({ length: 500, nullable: true })
    imageurl?: string;

    @Column({ type: 'datetime', nullable: true })
    project_due_date?: Date;

    // Many-to-One relationship with Group (each project belongs to one group)
    @ManyToOne('StaffGroup', (group: StaffGroup) => group.projects)
    @JoinColumn({ name: "group_group_id" })
    group?: StaffGroup;

    @OneToMany('Staff', (staff: Staff) => staff.project)
    assigned_staff_to_project?: Staff[];

    // Many-to-Many relationship with Group
    @ManyToMany('StaffGroup', (group: StaffGroup) => group.projectGroups)
    assignedGroups?: StaffGroup[];

}
