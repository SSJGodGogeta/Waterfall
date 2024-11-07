
document.addEventListener("DOMContentLoaded", () => {
    const addTimeButton = document.getElementById("add-time-button") as HTMLButtonElement;
    const saveButton = document.getElementById("save-button") as HTMLButtonElement;
    const tableBody = document.getElementById("work-times-body") as HTMLTableElement;
    const inputRow = document.getElementById("input-row") as HTMLTableRowElement;

    addTimeButton.onclick = () => {
        inputRow.style.display = "";  // Show the input row
        tableBody.appendChild(inputRow); // Add it to the table
    };
    saveButton.onclick = async () => {
        try {

            const responseCurrentUser = await fetch(
                "http://localhost:3000/api/authentication/currentUser",
                {
                    method: "GET",
                    credentials: 'include', // allow receiving cookies
                }
            );

            if (!responseCurrentUser.ok) {
                throw new Error("Network response was not ok " + responseCurrentUser.statusText);
            }
            const user = await responseCurrentUser.json();
            const entry = {
                date: (document.getElementById("input-date") as HTMLInputElement).value,
                weekday: (document.getElementById("input-weekday") as HTMLInputElement).value,
                start: (document.getElementById("input-start") as HTMLInputElement).value,
                end: (document.getElementById("input-end") as HTMLInputElement).value,
                pause_minutes: (document.getElementById("input-pause") as HTMLInputElement).value,
                performed_hours: (document.getElementById("input-worked-hours") as HTMLInputElement).value,
                absence: (document.getElementById("input-absence") as HTMLInputElement).value,
                difference_performed_target: (document.getElementById("input-difference") as HTMLInputElement).value,
                staffId: user.staff.staff_id,
            };
                const response = await fetch("http://localhost:3000/api/timetable", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(entry),
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Failed to save new entry");
            }

            const savedEntry = await response.json();
            console.log("New entry saved:", savedEntry);
            // Optionally refresh the table to reflect the newly added entry
        } catch (error) {
            console.error("Error saving entry:", error);
        }
    };
});