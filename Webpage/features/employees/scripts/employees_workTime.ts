document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch(`http://localhost:3000/api/employees`,
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
        const employees = await response.json();
        const entityJSON = sessionStorage.getItem('user')!;
        const entityObj = JSON.parse(entityJSON);
        const user = Object.assign(entityObj);

        // Get the table body where rows will be inserted
        const tableBody = document.getElementById('employee-work-body');
        if (!tableBody) {
            console.warn("No work employee body found.");
            return;
        }

        tableBody.innerHTML = ""; // Clear existing rows
        const currentDate = new Date();
        for (const employee of employees) {
            if (employee.staff_id == user.staff.staff_id) continue;
            const response2 = await fetch(`http://localhost:3000/api/calculateStatistics/all/${employee.user.user_id}`,
                {
                    method: "GET",
                    credentials: 'include', // allow receiving cookies
                }
            );
            if (!response2.ok) {
                if (response2.status == 401) {
                    window.location.href = "/Waterfall/Webpage/authentication/login.html"
                    return;

                }
                throw new Error("Network response was not ok " + response2.statusText);
            }
            const statistics = await response2.json();
            const dashboardStatistics = statistics.dashboardStatistics;
            const sicknessStatistics = statistics.sicknessStatistics;
            const vacationStatistics = statistics.vacationStatistics;
            const workTimeStatistics = statistics.workTimeStatistics;
            const row = document.createElement('tr');
                if ((employee.index % 2) === 1) row.classList.add('odd-row'); // Adds grey background to odd rows
                row.innerHTML = `
                <td>${employee.staff_id}</td>
                <td>${employee.first_name} ${employee.last_name}</td>
                <td>${new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toLocaleDateString([],)}</td>
                <td>${new Date(currentDate.getFullYear(), currentDate.getMonth()+1,0).toLocaleDateString([],)}</td>
                <td>${dashboardStatistics.flexTime} hrs</td>
                <td>
                    <div class="tooltip">${workTimeStatistics.hoursThisMonth}/${workTimeStatistics.mustWorkHoursMonth}<br>${workTimeStatistics.hoursThisWeek}/${workTimeStatistics.hoursPreviousWeek}
                        <span class="tooltiptext">hours this month / planned hours this month<br><br>
                        hours this week / hours previous week</span>
                    </div>
                </td>
                <td>
                    <div class="tooltip">${sicknessStatistics.sicknessThisMonth}/${sicknessStatistics.sicknessLastMonth}
                        <span class="tooltiptext">sickness this month / sickness last month</span>
                    </div>
                </td>
                <td>
                    <div class="tooltip">${vacationStatistics.maxAllowedVacationDays}/${vacationStatistics.takenVacationDays}<br>${vacationStatistics.unplannedVacationDays}/${vacationStatistics.deniedVacationDays}
                       <span class="tooltiptext">max vacation days / taken vacation days<br><br>
                       unplanned vacation days / rejected vacation days</span> 
                    </div>
                </td>
                `;
                tableBody.appendChild(row);
            }// End of inner for loop
    } catch (error) {
        console.error("Failed to fetch timetable data:", error);
    }
});