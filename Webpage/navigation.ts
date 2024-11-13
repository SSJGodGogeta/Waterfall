document.addEventListener("DOMContentLoaded", async function () {
    const dashboard_button: HTMLDataListElement = document.getElementById("dashboard") as HTMLDataListElement;
    const my_work_times_button: HTMLDataListElement = document.getElementById("my_work_times") as HTMLDataListElement;
    const my_vacations_button: HTMLDataListElement = document.getElementById("my_vacations") as HTMLDataListElement;
    const sickness_button: HTMLDataListElement = document.getElementById("sickness") as HTMLDataListElement;
    const my_employees_button: HTMLDataListElement = document.getElementById("my_employees") as HTMLDataListElement;
    const my_employees_work_time_button: HTMLDataListElement = document.getElementById("my_employees_work_time") as HTMLDataListElement;
    const refresh_button: HTMLDataListElement = document.getElementById("refresh") as HTMLDataListElement;
    const shutdown_button: HTMLButtonElement = document.getElementById("shutdownButton") as HTMLButtonElement;

    const profile_picture: HTMLImageElement = document.getElementById("profile_picture") as HTMLImageElement;
    const name: HTMLHeadingElement = document.getElementById("name") as HTMLHeadingElement;
    const role: HTMLParagraphElement = document.getElementById("role") as HTMLParagraphElement;

    // only available in dashboard
    const greeting_element: HTMLHeadingElement|null = document.getElementById("greeting") as HTMLHeadingElement|null;

    let user;

    // check if user is in session storage
    const entityJSON = sessionStorage.getItem('user');
    if (entityJSON) {
        // there is a user stored in session storage

        // parse json to a object
        const entityObj = JSON.parse(entityJSON);

        // convert the object to a user entity
        user = Object.assign(entityObj);
    } else {
        // there is no user stored in session storage
        const response = await fetch(
            "http://localhost:3000/api/authentication/currentUser",
            {
                method: "GET",
                credentials: 'include', // allow receiving cookies
            }
        );

        if (!response.ok) {
            if (response.status == 401) {
                window.location.href = "/Waterfall/Webpage/authentication/login.html"
                return;
            }
            throw new Error("Network response was not ok " + response.statusText);
        }

        user = await response.json();

        const entityJSON = JSON.stringify(user);
        sessionStorage.setItem('user', entityJSON);
    }

    if (user && user.staff) {
        if (user.staff.role.privilege.privilege_techcode != "EMPLOYEE") {
            my_employees_button.style.display = "flex";
            my_employees_work_time_button.style.display = "flex";
        }

        if (user.user_imageurl) {
            profile_picture.src = user.user_imageurl;
        }
        name.textContent = `${user.staff.first_name} ${user.staff.last_name}`;
        role.textContent = `${user.staff.role.role_name} at STC`;

        if (greeting_element) {
            greeting_element.textContent = `Hello ${user.staff!.first_name} 👋`;
        }
    }

    dashboard_button.onclick = function () {
        // go to the dashboard screen
        window.location.href = "/Waterfall/Webpage/features/dashboard/screens/dashboard.html";
    }

    my_work_times_button.onclick = function () {
        // go to the my work times screen
        window.location.href = "/Waterfall/Webpage/features/work_times/screens/my_work_times.html";
    }

    my_vacations_button.onclick = function () {
        // go to the my vacations screen
        window.location.href = "/Waterfall/Webpage/features/vacations/screens/my_vacations.html";
    }

    sickness_button.onclick = function () {
        // go to the sickness screen
        window.location.href = '/Waterfall/Webpage/features/sickness/screens/sickness.html';
    }

    my_employees_button.onclick = async function () {
        // go to the my employee screen
        try {
            const response = await fetch(
                "http://localhost:3000/api/clearCache",
                {
                    method: "POST",
                    credentials: 'include', // allow receiving cookies
                }
            );
            if (!response.ok) {
                if (response.status == 401) {
                    window.location.href = "/Waterfall/Webpage/authentication/login.html"
                    return;
                }
                throw new Error("Network response was not ok " + response.statusText);
            }
            window.location.reload();
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }
        window.location.href = '/Waterfall/Webpage/features/employees/screens/my_employees.html';
    }

    my_employees_work_time_button.onclick = async function () {
        // go to the my employee screen
        try {
            const response = await fetch(
                "http://localhost:3000/api/clearCache",
                {
                    method: "POST",
                    credentials: 'include', // allow receiving cookies
                }
            );
            if (!response.ok) {
                if (response.status == 401) {
                    window.location.href = "/Waterfall/Webpage/authentication/login.html"
                    return;
                }
                throw new Error("Network response was not ok " + response.statusText);
            }
            window.location.reload();
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }
        window.location.href = '/Waterfall/Webpage/features/employees/screens/my_employee_work.html';
    }

    refresh_button.onclick = async function () {
        try {
            sessionStorage.clear();
            const response = await fetch(
                "http://localhost:3000/api/clearCache",
                {
                    method: "POST",
                    credentials: 'include', // allow receiving cookies
                }
            );
            if (!response.ok) {
                if (response.status == 401) {
                    window.location.href = "/Waterfall/Webpage/authentication/login.html"
                    return;
                }
                throw new Error("Network response was not ok " + response.statusText);
            }
            window.location.reload();
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }

    }

    shutdown_button.onclick = async function () {
        try {
            const response = await fetch("http://localhost:3000/api/authentication/logout", {
                method: 'POST',
                credentials: 'include', // allow receiving cookies
            });
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            sessionStorage.clear();
            window.location.href = "/Waterfall/Webpage/authentication/login.html";
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }
    }
});