document.addEventListener("DOMContentLoaded", async function () {
    // get the projects container, into which the following code will put the individual projects
    const projects_container: HTMLDivElement = document.getElementById("my_projects") as HTMLDivElement;

    try {
        const response = await fetch("http://localhost:3000/api/users");
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const users = await response.json();
        console.log("Fetched users:", users);


    } catch (error) {
        console.error("Failed to fetch user:", error);
    }

    try {
        const response = await fetch("http://localhost:3000/api/projects");
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const projects = await response.json();
        console.log("Fetched projects:", projects);

        // Get the element with id "roles" and display the data
        if (projects_container) {
            for (let project of projects) {
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

                // // generate active workers element
                // const active_workers: HTMLDivElement = document.createElement('div');
                // active_workers.className = 'active_workers'
                //
                // // generate the currently active paragraph element
                // const currently_active: HTMLParagraphElement = document.createElement('p');
                // currently_active.textContent = "currently active:";
                // active_workers.appendChild(currently_active); // add the currently active paragraph to the active workers div
                //
                // // generate the worker icon elements
                // // TODO: replace with actual data. For now we are using placeholder images and counts
                // const worker_icon: HTMLImageElement = document.createElement('img');
                // worker_icon.className = 'worker_icon';
                // worker_icon.src = "/Webpage/assets/demo/profile_pictures/agathe_berke.jpg";
                // active_workers.appendChild(worker_icon); // add the worker icon to the active workers div
                //
                // const worker_icon_2: HTMLImageElement = document.createElement('img');
                // worker_icon_2.className = 'worker_icon';
                // worker_icon_2.src = "/Webpage/assets/demo/profile_pictures/naomi_middendorf.jpg";
                // active_workers.appendChild(worker_icon_2); // add the worker icon to the active workers div
                //
                // // generate the count abreviation paragraph element
                // const count_abreviation: HTMLParagraphElement = document.createElement('p');
                // count_abreviation.className = 'count_abreviation';
                // count_abreviation.textContent = "+5";
                // active_workers.appendChild(count_abreviation); // add the count abreviation to the active workers div
                //
                // projects_element.appendChild(active_workers); // add the active workers div to the projects element

                projects_container.appendChild(projects_element); // add the projects element to the projects container
            }
        } else {
            throw new Error("rolesContainer not found");
        }
    } catch (error) {
        console.error("Failed to fetch roles:", error);
    }
});
