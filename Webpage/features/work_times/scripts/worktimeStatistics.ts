document.addEventListener("DOMContentLoaded", async function () {
    // get the individual statistics cards
    const hours_this_week: HTMLDivElement = document.getElementById("hours_this_week") as HTMLDivElement;
    const hours_previous_week: HTMLDivElement = document.getElementById("hours_previous_week") as HTMLDivElement;
    const hours_this_month: HTMLDivElement = document.getElementById("hours_this_month") as HTMLDivElement;
    const must_work_time_month: HTMLDivElement = document.getElementById("must_work_time_month") as HTMLDivElement;

    // get the value headings for the statistics cards
    const hours_this_week_value: HTMLHeadingElement = hours_this_week.querySelector(".statistics_value") as HTMLHeadingElement;
    const hours_previous_week_value: HTMLHeadingElement = hours_previous_week.querySelector(".statistics_value") as HTMLHeadingElement;
    const hours_this_month_value: HTMLHeadingElement = hours_this_month.querySelector(".statistics_value") as HTMLHeadingElement;
    const must_work_time_month_value: HTMLHeadingElement = must_work_time_month.querySelector(".statistics_value") as HTMLHeadingElement;
    try {
        const response = await fetch("http://localhost:3000/api/calculateStatistics/worktime",
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
        const workTimeStatistics = await response.json();
        // for now, we'll just create some dummy data
        hours_this_week_value.textContent = `${workTimeStatistics.hoursThisWeek} hr`;
        hours_previous_week_value.textContent = `${workTimeStatistics.hoursPreviousWeek} hr`;
        hours_this_month_value.textContent = `${workTimeStatistics.hoursThisMonth} hr`;
        must_work_time_month_value.textContent = `${workTimeStatistics.mustWorkHoursMonth} hr`;
    }
    catch (error) {
        console.error("Failed to get statistics from server:", error);
    }
});