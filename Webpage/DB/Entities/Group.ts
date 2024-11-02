import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity, OneToMany} from 'typeorm';
import type { Project } from './Project.js';
import {Staff} from "./Staff.js";

@Entity('group')
export class Group extends BaseEntity {
    @PrimaryGeneratedColumn()
    group_id!: number;

    @Column({ length: 45 })
    group_name!: string;

    @OneToMany('Project', (project: Project) => project.group)
    projects?: Project[];

    @ManyToMany('Project', (project: Project) => project.assignedGroups)
    projectGroups?: Project[];

    @OneToMany('Staff', (staff:Staff) => staff.group)
    staff_members?: Staff[];
}