const dashboard_button: HTMLDataListElement = document.getElementById("dashboard") as HTMLDataListElement;
const my_work_times_button: HTMLDataListElement = document.getElementById("my_work_times") as HTMLDataListElement;
const my_vacations_button: HTMLDataListElement = document.getElementById("my_vacations") as HTMLDataListElement;
const sickness_button: HTMLDataListElement = document.getElementById("sickness") as HTMLDataListElement;
const my_employees_button: HTMLDataListElement = document.getElementById("my_employees") as HTMLDataListElement;
const refresh_button: HTMLDataListElement = document.getElementById("refresh") as HTMLDataListElement;
const shutdown_button: HTMLButtonElement = document.getElementById("shutdownButton") as HTMLButtonElement;

document.addEventListener("DOMContentLoaded", async function () {
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
        console.log(user.staff.role);
        if (user.staff.role.privilege.privilege_techcode == "SUPERVISOR") {
            my_employees_button.style.display = "flex";
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

    my_employees_button.onclick = function () {
        // go to the my employee screen
        window.location.href = '/Waterfall/Webpage/features/employees/screens/my_employees.html';
    }

    refresh_button.onclick = async function () {
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