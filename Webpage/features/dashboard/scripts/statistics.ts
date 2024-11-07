document.addEventListener("DOMContentLoaded", async function () {
    // get the individual statistics cards
    const hours_this_week: HTMLDivElement = document.getElementById("hours_this_week") as HTMLDivElement;
    const flex_time_account: HTMLDivElement = document.getElementById("flex_time_account") as HTMLDivElement;
    const sick_days: HTMLDivElement = document.getElementById("sick_days") as HTMLDivElement;
    const remaining_vacation_days: HTMLDivElement = document.getElementById("remaining_vacation_days") as HTMLDivElement;

    // get the value headings for the statistics cards
    const hours_this_week_value: HTMLHeadingElement = hours_this_week.querySelector(".statistics_value") as HTMLHeadingElement;
    const flex_time_account_value: HTMLHeadingElement = flex_time_account.querySelector(".statistics_value") as HTMLHeadingElement;
    const sick_days_value: HTMLHeadingElement = sick_days.querySelector(".statistics_value") as HTMLHeadingElement;
    const remaining_vacation_days_value: HTMLHeadingElement = remaining_vacation_days.querySelector(".statistics_value") as HTMLHeadingElement;

    try {
        const responseCurrentuser = await fetch(
            "http://localhost:3000/api/authentication/currentUser",
            {
                method: "GET",
                credentials: 'include', // allow receiving cookies
            }
        );

        if (!responseCurrentuser.ok) {
            throw new Error("Network response was not ok " + responseCurrentuser.statusText);
        }

        const user = await responseCurrentuser.json();
        console.log("Fetched user:", user);

        const response = await fetch("http://localhost:3000/api/calculateStatistics/:" + user.staff.staff_id,
        {
            method: "GET",
            credentials: "include",
        }
        );
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const dashboardStatistiics = await response.json();
        console.log(dashboardStatistiics);
        // for now, we'll just create some dummy data
        hours_this_week_value.textContent = `${dashboardStatistiics.hoursThisWeek} hr`;
        flex_time_account_value.textContent = `${dashboardStatistiics.flexTime} hr`;
        sick_days_value.textContent = `${dashboardStatistiics.sickDays} days`;
        remaining_vacation_days_value.textContent = `${dashboardStatistiics.remainingVacationDays} days`;
        /*
        flexTime: flexTime,
            hoursThisWeek: hoursThisWeek,
            hoursPreviousWeek: hoursPreviousWeek,
            sickDays: sickDays,
            remainingVacationDays: remainingVacationDays
         */
    }
    catch (error) {
        console.error("Failed to get statistics from server:", error);
    }
});