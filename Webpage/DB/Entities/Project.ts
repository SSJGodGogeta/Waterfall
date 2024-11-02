import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    BaseEntity,
    JoinColumn,
    ManyToOne, OneToMany
} from 'typeorm';
import type { Group } from './Group.js';
import {Staff} from "./Staff.js";

@Entity('project')
export class Project extends BaseEntity {
    @PrimaryGeneratedColumn()
    project_id!: number;

    @Column({ length: 45 })
    project_name!: string;

    @Column({ length: 250, nullable: true })
    project_description?: string;

    @Column({ type: 'datetime', nullable: true })
    project_due_date?: Date;

    // Many-to-One relationship with Group (each project belongs to one group)
    @ManyToOne('Group', (group: Group) => group.projects)
    @JoinColumn({ name: "group_group_id" })
    group?: Group;

    // Many-to-Many relationship with Group
    @ManyToMany('Group', (group: Group) => group.projectGroups)
    @JoinTable({
        name: 'project_group',  // Name of the join table
        joinColumns: [{ name: "project_id" }],  // Column in the join table that references Project
        inverseJoinColumns: [{ name: "group_id" }] // Column in the join table that references Group
    })
    assignedGroups?: Group[];
    @OneToMany('Staff', (staff: Staff) => staff.project)
    assigned_staff_to_project?: Staff[];
}
