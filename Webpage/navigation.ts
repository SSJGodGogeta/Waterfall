// load the buttons from the navigation bar
const dashboard_button: HTMLDataListElement = document.getElementById("dashboard") as HTMLDataListElement;
const my_work_times_button: HTMLDataListElement = document.getElementById("my_work_times") as HTMLDataListElement;
const my_vacations_button: HTMLDataListElement = document.getElementById("my_vacations") as HTMLDataListElement;
const sickness_button: HTMLDataListElement = document.getElementById("sickness") as HTMLDataListElement;
const refresh_button: HTMLDataListElement = document.getElementById("refresh") as HTMLDataListElement;
const shutdown_button: HTMLButtonElement = document.getElementById("shutdownButton") as HTMLButtonElement;

document.addEventListener("DOMContentLoaded", async function () {
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
            window.location.href = "/Waterfall/Webpage/authentication/login.html";
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }
    }
});