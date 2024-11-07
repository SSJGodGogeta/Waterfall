document.addEventListener("DOMContentLoaded", async function () {
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

    try {
        const response = await fetch(`http://localhost:3000/api/timetable/${user.staff.staff_id}`,
            {
                method: "GET",
                credentials: 'include', // allow receiving cookies
            }
        );
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const timetableEntries = await response.json();
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
            const onejan = new Date(date.getFullYear(), 0, 1);
            const millisInDay = 86400000;
            // Convert dates to timestamps in milliseconds

            const dayDiff = (date.getTime() - onejan.getTime()) / millisInDay;
            // Calculate the week number
            const weekNumber = Math.ceil((dayDiff + onejan.getDay() + 1) / 7);
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

const date = new Date();
date.getFullYear();
date.getDate();