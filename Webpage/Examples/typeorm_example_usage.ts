import {dataSource} from "../DB/dataSource.js";
import {Staff} from "../DB/Entities/Staff.js";
import {Project} from "../DB/Entities/Project.js";
import {StaffGroup} from "../DB/Entities/Group.js";

export async function typeorm_example_usage() {
    await dataSource.initialize();
// @ts-ignore
    const staff = await Staff.findOne({
        relations: {
            group: {
                projects:true,
                projectGroups:true,
                staff_members:true
            },
            user: {
                staff:true
            },
            role: {
                privilege: true,
                staff:true
            },
            project: {
                group:true,
                assigned_staff_to_project:true,
                assignedGroups:true
            },
            flexTimes:true,
            absences:true,
            timetables: true,
        },
        where: {
            staff_id: 5
        }
    });
// @ts-ignore
    const projects = await Project.findOne({
        relations: {
            group: true,
            assigned_staff_to_project:true,
            assignedGroups:true
        },
        where: {
            project_id: 1
        }
    });
    const project = await Project.findOne({
        where: { project_id: 1 },
        relations: {
            assignedGroups:true,
            group:true
        }  // This loads the related groups using the join table
    });
// Find a specific group
    const group = await StaffGroup.findOne({
        where: { group_id: 1 }
    });

    if (project && group) {
        // Add the group to the project's groups array
        project.assignedGroups?.push(group);

        // Save the project to update the relationship in the join table
        await project.save();

        console.log("Updated Project with Groups:", project);
    }
    console.log("Project:", project);
    console.log("Related Groups:", project?.assignedGroups);
    console.log(projects);
}
