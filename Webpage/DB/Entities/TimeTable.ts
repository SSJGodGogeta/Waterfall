import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn, BaseEntity,
} from 'typeorm';
import {Staff} from "./Staff";
import {Project} from "./Project";


// Timetable Entity
@Entity('timetable')
export class Timetable extends BaseEntity{
    @Column({ length: 45, primary: true })
    index!: string;

    @Column({ type: 'date' })
    date!: Date;

    @Column({ length: 20 })
    weekday!: string;

    @Column({ type: 'datetime' })
    start!: Date;

    @Column({ type: 'datetime' })
    end!: Date;

    @Column({ type: 'int' })
    pause_minutes!: number;

    @Column({ type: 'double' })
    performed_hours!: number;

    @Column({ type: 'double' })
    difference_performed_target!: number;

    @Column({ length: 45, nullable: true })
    abscence?: string;

    @ManyToOne(() => Staff, (staff) => staff.timetables)
    @JoinColumn({ name: 'staff_staff_id' })
    staff!: Staff;

    @ManyToOne(() => Project, (project) => project.timetables)
    @JoinColumn({ name: 'project_project_id' })
    project!: Project;
}
