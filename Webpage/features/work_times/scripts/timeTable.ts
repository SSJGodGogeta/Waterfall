document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch(`http://localhost:3000/api/timetable`,
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
        const {timetableEntries} = await response.json();
        // Get the table body where rows will be inserted
        const tableBody = document.getElementById('work-times-body');
        if (!tableBody) {
            console.warn("No work times body found.");
            return;
        }
        tableBody.innerHTML = ""; // Clear existing rows
        console.log(timetableEntries);
        for (const entry of timetableEntries) {
            const row = document.createElement('tr');
            if ((entry.index % 2) === 1) row.classList.add('odd-row'); // Adds grey background to odd rows

            const date:Date = new Date(entry.date);
            const weekNumber = getWeekNumber(date);
            // Convert dates to timestamps in milliseconds

            const absence:string = entry.abscence ?? "--";
            row.innerHTML = `
                <td>${date.toLocaleDateString()}</td>
                <td>${weekNumber}</td>
                <td>${entry.weekday}</td>
                <td>${new Date(entry.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td>${new Date(entry.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td>${entry.pause_minutes} min</td>
                <td>${entry.performed_hours.toFixed(2)} hr</td>
                <td>${absence}</td>
                <td class="${entry.difference_performed_target >= 0 ? 'positive' : 'negative'}">
                    ${entry.difference_performed_target >= 0 ? '+' : ''}${entry.difference_performed_target.toFixed(2)} hr
                </td>
            `;
            tableBody.appendChild(row);
        }
    } catch (error) {
        console.error("Failed to fetch timetable data:", error);
    }
});

function getWeekNumber(date: Date): number {
    const target = new Date(date);
    target.setDate(target.getDate() + 4 - (target.getDay() || 7));
    const yearStart = new Date(target.getFullYear(), 0, 1);
    return Math.ceil((((target.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}
