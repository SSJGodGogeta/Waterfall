document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch(`http://localhost:3000/api/vacation`,
            {
                method: "GET",
                credentials: 'include', // allow receiving cookies
            }
        );
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }

        const {vacationEntries} = await response.json();
        // Get the table body where rows will be inserted
        const tableBody = document.getElementById('vacation-body');
        if (!tableBody) {
            console.warn("No vacation body found.");
            return;
        }
        tableBody.innerHTML = ""; // Clear existing rows
        console.log(vacationEntries);
        for (const entry of vacationEntries) {
            const row = document.createElement('tr');
            if ((entry.index % 2) === 1) row.classList.add('odd-row'); // Adds grey background to odd rows
            let einheit = "min"
            let duration: number =
                Math.ceil((new Date(entry.end_time).getTime() - new Date(entry.start_time).getTime()) / 60000);
            // Limit duration to two decimal places
            if (duration > 60) {
                duration = duration/60;
                einheit = "hr"
            }
            if (duration > 24) {
                duration = duration/24;
                einheit = "day(s)"
            }
            let durationTwoDecimals: number = parseFloat(duration.toFixed(2));
            row.innerHTML = `
                <td>${new Date(entry.start_time).toLocaleDateString([], )}</td>
                <td>${new Date(entry.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td>${new Date(entry.end_time).toLocaleDateString([], )}</td>
                <td>${new Date(entry.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td>${durationTwoDecimals}  ${einheit}</td>
                <td>${entry.permission_status}</td>
                <td>${entry.response}</td>
            `;
            tableBody.appendChild(row);
        }
    } catch (error) {
        console.error("Failed to fetch vacation data:", error);
    }
});