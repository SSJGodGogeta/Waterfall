document.addEventListener("DOMContentLoaded", async function () {
    // get the individual statistics cards
    const max_vacation_days: HTMLDivElement = document.getElementById("max_vacation_days") as HTMLDivElement;
    const unplanned_vacation_days: HTMLDivElement = document.getElementById("unplanned_vacation_days") as HTMLDivElement;
    const taken_vacation_days: HTMLDivElement = document.getElementById("taken_vacation_days") as HTMLDivElement;
    const denied_vacations: HTMLDivElement = document.getElementById("denied_vacations") as HTMLDivElement;

    // get the value headings for the statistics cards
    const max_vacation_days_value: HTMLHeadingElement = max_vacation_days.querySelector(".statistics_value") as HTMLHeadingElement;
    const unplanned_vacation_days_value: HTMLHeadingElement = unplanned_vacation_days.querySelector(".statistics_value") as HTMLHeadingElement;
    const taken_vacation_days_value: HTMLHeadingElement = taken_vacation_days.querySelector(".statistics_value") as HTMLHeadingElement;
    const denied_vacations_value: HTMLHeadingElement = denied_vacations.querySelector(".statistics_value") as HTMLHeadingElement;
    try {
        const response = await fetch("http://116.203.25.18:3000/api/calculateStatistics/vacations",
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
        const vacationStatistics = await response.json();
        // for now, we'll just create some dummy data
        max_vacation_days_value.textContent = `${vacationStatistics.maxAllowedVacationDays} days`;
        unplanned_vacation_days_value.textContent = `${vacationStatistics.unplannedVacationDays} days`;
        taken_vacation_days_value.textContent = `${vacationStatistics.takenVacationDays} days`;
        denied_vacations_value.textContent = `${vacationStatistics.deniedVacationDays} days`;
    }
    catch (error) {
        console.error("Failed to get statistics from server:", error);
    }
});