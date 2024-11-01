import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany, BaseEntity,
} from 'typeorm';
import {Timetable} from "./TimeTable.js";


// Project Entity
@Entity('project')
export class Project extends BaseEntity{
    @PrimaryGeneratedColumn()
    project_id!: number;

    @Column({ length: 45 })
    project_name!: string;

    @Column({ length: 250, nullable: true })
    project_description?: string;

    @Column({ type: 'datetime', nullable: true })
    project_due_date?: Date;

    @Column({ length: 45, nullable: true })
    project_assigned_group_ids?: string;

    @OneToMany(() => Timetable, (timetable) => timetable.project)
    timetables?: Timetable[];
}
