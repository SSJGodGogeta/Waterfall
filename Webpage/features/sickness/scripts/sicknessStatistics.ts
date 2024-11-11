document.addEventListener("DOMContentLoaded", async function () {
    const sick_days_this_month: HTMLDivElement = document.getElementById("sick_days_this_month") as HTMLDivElement;
    const sick_days_last_month: HTMLDivElement = document.getElementById("sick_days_last_month") as HTMLDivElement;

    const sick_days_this_month_value: HTMLHeadingElement = sick_days_this_month.querySelector(".statistics_value") as HTMLHeadingElement;
    const sick_days_last_month_value: HTMLHeadingElement = sick_days_last_month.querySelector(".statistics_value") as HTMLHeadingElement;

    try {
        const response = await fetch("http://localhost:3000/api/calculateStatistics/sickness",
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
        const sicknessStatistics = await response.json();
        sick_days_this_month_value.textContent = `${sicknessStatistics.sicknessThisMonth} days`;
        sick_days_last_month_value.textContent = `${sicknessStatistics.sicknessLastMonth} days`;
    }
    catch (error) {
        console.error("Failed to get statistics from server:", error);
    }
});