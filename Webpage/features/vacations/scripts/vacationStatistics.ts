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
        //TODO: Define a new route to get vacation specific data from the api. This is currently wrong and access the data from my work times.
        // Would be also good to clear up the code later and organize it better. Soo many redundancies and bad structure... Blame me (Arman)
        const response = await fetch("http://localhost:3000/api/calculateStatistics",
            {
                method: "GET",
                credentials: "include",
            }
        );
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const dashboardStatistics = await response.json();
        // for now, we'll just create some dummy data
        max_vacation_days_value.textContent = `${dashboardStatistics.hoursThisWeek} hr`;
        unplanned_vacation_days_value.textContent = `${dashboardStatistics.hoursPreviousWeek} hr`;
        taken_vacation_days_value.textContent = `${dashboardStatistics.hoursThisMonth} hr`;
        denied_vacations_value.textContent = `${dashboardStatistics.mustWorkHoursMonth} hr`;
    }
    catch (error) {
        console.error("Failed to get statistics from server:", error);
    }
});