document.addEventListener("DOMContentLoaded", async function () {
    // get the projects container, into which the following code will put the individual projects
    const projects_container: HTMLDivElement = document.getElementById("my_projects") as HTMLDivElement;
    try {
        const response = await fetch("http://localhost:3000/api/projects",
            {
                method: "GET",
                credentials: "include",
            }
        );
        if (!response.ok) {
            if (response.status == 401) {
                window.location.href = "/Waterfall/Webpage/authentication/login.html"
                return;
            }
            throw new Error("Network response was not ok " + response.statusText);
        }
        const {projectsFromApi, user} = await response.json();
        console.log("Fetched projects:", projectsFromApi);

        // Get the element with id "roles" and display the data
        if (projects_container) {
            for (let project of projectsFromApi) {
                if (project.group.group_id != user.staff.group.group_id) continue;
                // Generate new Element, used as a container for an individual project
                const projects_element: HTMLDivElement = document.createElement('div');
                projects_element.className = 'projects_element';

                // generate header element, consisting of an image and the title
                const project_header: HTMLDivElement = document.createElement('div');
                project_header.className = 'project_header';

                if (project.imageurl) {
                    // generate the image element
                    const project_image: HTMLImageElement = document.createElement('img');
                    project_image.className = 'project_image';
                    project_image.src = project.imageurl
                    project_header.appendChild(project_image); // add the image to the header
                }

                // generate the title element
                const project_title: HTMLHeadingElement = document.createElement('h4');
                project_title.textContent = project.project_name;
                project_header.appendChild(project_title); // add the title to the header

                projects_element.appendChild(project_header); // add the header to the projects element

                // generate description element
                const project_description: HTMLParagraphElement = document.createElement('p');
                project_description.className = 'project_description';
                project_description.textContent = project.project_description;
                projects_element.appendChild(project_description); // add the description to the projects element


                // generate active workers element
                const active_workers: HTMLDivElement = document.createElement('div');
                active_workers.className = 'active_workers'

                // generate the currently active paragraph element
                const currently_active: HTMLParagraphElement = document.createElement('p');
                currently_active.textContent = "Assigned employees: ";
                active_workers.appendChild(currently_active); // add the currently active paragraph to the active workers div

                // generate the worker icon elements
                // project.assigned_staff_to_project should contain the assigned staffs to this project. Its an array.
                console.log(project.assigned_staff_to_project);
                let imageCounter:number = 0;
                for (const staff of project.group.staff_members) {
                    if (!staff.user.user_imageurl) continue;
                    if (imageCounter >= 3) break;
                    const worker_icon: HTMLImageElement = document.createElement('img');
                    worker_icon.className = 'worker_icon';
                    worker_icon.src = staff.user.user_imageurl;
                    console.log(staff.user.user_imageurl);
                    active_workers.appendChild(worker_icon);
                    imageCounter++;
                }
                if (project.assigned_staff_to_project.length > imageCounter) {
                    const count_abreviation: HTMLParagraphElement = document.createElement('p');
                    count_abreviation.className = 'count_abreviation';
                    count_abreviation.textContent = "+"+(project.assigned_staff_to_project.length - imageCounter).toString();
                    active_workers.appendChild(count_abreviation); // add the count abreviation to the active workers div
                }
                // generate the count abreviation paragraph element
                projects_element.appendChild(active_workers); // add the active workers div to the projects elemen
                projects_container.appendChild(projects_element); // add the projects element to the projects container
            }
        } else {
            throw new Error("rolesContainer not found");
        }
    } catch (error) {
        console.error("Failed to fetch projects:", error);
    }
});
