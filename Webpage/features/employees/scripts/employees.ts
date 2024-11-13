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
        const absenceCode = getAbsenceCode(user);
        if (!absenceCode) console.error("Wont load any data on my employees");
        // Get the table body where rows will be inserted
        const tableBody = document.getElementById('employee-body');
        if (!tableBody) {
            console.warn("No work employee body found.");
            return;
        }
        tableBody.innerHTML = ""; // Clear existing rows
        console.warn("Employees: ", employees);
        for (const employee of employees) {
            if (employee.staff_id == user.staff.staff_id) continue;
            console.warn("Absences of each employee: ", employee.absences);
            for (const entry of employee.absences){
                if (entry.type_techcode != absenceCode && absenceCode !== "ALL") continue;
                let einheit = "min"
                let duration: number =
                    Math.ceil((new Date(entry.end_time).getTime() - new Date(entry.start_time).getTime()) / 60000);
                // Limit duration to two decimal places
                if (Math.abs(duration) > 60) {
                    duration = duration/60;
                    einheit = "hr"
                    // duration in hours
                    if (Math.abs(duration) > 24) {
                        duration = duration/24;
                        einheit = "day(s)"
                    }
                }
                let durationTwoDecimals: number = parseFloat(duration.toFixed(2));

                const row = document.createElement('tr');
                if ((employee.index % 2) === 1) row.classList.add('odd-row'); // Adds grey background to odd rows
                row.innerHTML = `
                <td>${employee.staff_id}</td>
                <td>${employee.first_name} ${employee.last_name}</td>
                <td>${new Date(entry.start_time).toLocaleDateString([],)}</td>
                <td>${new Date(entry.start_time).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</td>
                <td>${new Date(entry.end_time).toLocaleDateString([],)}</td>
                <td>${new Date(entry.end_time).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</td>
                <td>${durationTwoDecimals}  ${einheit}</td>
                <td>${entry.type_techcode}</td>
                <td class="${entry.permission_status.includes("AKNOWLEDGED") ? '' : entry.permission_status.includes("APPROVED") ? 'positive' : 'negative'}">
                    ${entry.permission_status}
                </td>
                <td>
                    <div class="button-container">
                        <button class="deciding-button accept-button">
                            <img class="deciding-button-image" src="/Webpage/assets/green_check.png" alt="accept" data-enabled="${entry.permission_status.includes("AKNOWLEDGED")}">
                        </button>
                    </div>
                </td>
                <td>
                    <button class="deciding-button deny-button">
                            <img class="deciding-button-image" src="/Webpage/assets/cross_red_circle.png" alt="deny" data-enabled="${entry.permission_status.includes("AKNOWLEDGED")}">
                    </button>
                </td>
                `;
                tableBody.appendChild(row);


                const acceptButton = row.querySelector('.accept-button') as HTMLButtonElement;
                const denyButton = row.querySelector('.deny-button') as HTMLButtonElement;

                acceptButton.onclick = async function () {
                    await buttonOnCliCk("APPROVED", entry);
                };
                denyButton.onclick = async function () {
                    await buttonOnCliCk("REJECTED", entry);
                };
            }// End of inner for loop

        }
    } catch (error) {
        console.error("Failed to fetch timetable data:", error);
    }
});

function getAbsenceCode(user:any): string|undefined{
    const pT = user.staff.role.privilege.privilege_techcode;
    if (pT == "SUPERVISOR") return "VACATION";
    else if (pT == "HR") return "SICK";
    else if (pT == "ADMIN") return "ALL";
    else return undefined
}

async function buttonOnCliCk(status:string, entry:any) {
    if (entry.permission_status == "AKNOWLEDGED") {
        const response = await fetch(`http://localhost:3000/api/employees/${entry.absence_id}`, {
            method: "POST",
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ PermissionStatus: status })
        });
        if (!response.ok) {
            if (response.status == 401) {
                window.location.href = "/Waterfall/Webpage/authentication/login.html";
                return;
            }
            throw new Error("Network response was not ok " + response.statusText);
        }
        try {
            const response = await fetch(
                "http://localhost:3000/api/clearCache",
                {
                    method: "POST",
                    credentials: 'include', // allow receiving cookies
                }
            );
            if (!response.ok) {
                if (response.status == 401) {
                    return;
                }
                throw new Error("Network response was not ok " + response.statusText);
            }
            window.location.reload();
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }
    }
}