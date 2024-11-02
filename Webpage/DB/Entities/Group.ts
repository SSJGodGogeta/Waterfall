import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity, OneToMany, JoinTable} from 'typeorm';
import type { Project } from './Project.js';
import {Staff} from "./Staff.js";

@Entity('staff_group')
export class StaffGroup extends BaseEntity {
    @PrimaryGeneratedColumn()
    group_id!: number;

    @Column({ length: 45 })
    group_name!: string;

    @OneToMany('Project', (project: Project) => project.group)
    projects?: Project[];

    @OneToMany('Staff', (staff:Staff) => staff.group)
    staff_members?: Staff[];

    @ManyToMany('Project', (project: Project) => project.assignedGroups)
    @JoinTable({
        name: 'project_group',  // Name of the join table
        joinColumns: [{ name: "group_id", referencedColumnName: "group_id", foreignKeyConstraintName: "fk_project_group_group"}],  // Column in the join table that references Project
        inverseJoinColumns: [{ name: "project_id", referencedColumnName: "project_id", foreignKeyConstraintName: "fk_project_group_project" }] // Column in the join table that references Group
    })
    projectGroups?: Project[];
}