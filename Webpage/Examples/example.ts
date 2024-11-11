export {};

function main() {
    console.log("Hello World!");
}
main();

async function fetchRoles() {
    try {
        const response = await fetch("http://localhost:3000/api/roles");
        if (!response.ok) {
            if (response.status == 401) {
                window.location.href = "/Waterfall/Webpage/authentication/login.html"
                return;
            }
            throw new Error("Network response was not ok " + response.statusText);
        }
        const roles = await response.json();
        console.log("Fetched roles:", roles);

        // Get the element with id "roles" and display the data
        const rolesContainer = document.getElementById("roles");
        if (rolesContainer) {
            rolesContainer.innerHTML = roles.map((role: any) => `<li>${role.role_name}</li>`).join("");
        } else {
            throw new Error("rolesContainer not found");
        }
    } catch (error) {
        console.error("Failed to fetch roles:", error);
    }
}

// Run fetchRoles once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    fetchRoles();
});



async function updateRole(roleId: number, newRoleName: string, newPrivilegeId: number) {
    try {
        const response = await fetch(`http://localhost:3000/api/roles/${roleId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role_name: newRoleName, privilege_id: newPrivilegeId }), // Sending the new role name
        });

        if (!response.ok) {
            throw new Error('Failed to update role: ' + response.statusText);
        }
        const updatedRole = await response.json();
        console.log("Updated/Added role:", updatedRole);
        window.location.reload();
        // Optionally, refresh the role list or update the UI as needed
    } catch (error) {
        console.error("Error updating role:", error);
    }
}

// Attach event listener to the form
document.getElementById("updateRoleForm")?.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission
    const roleId = parseInt((document.getElementById("roleId") as HTMLInputElement).value);
    const newRoleName = (document.getElementById("newRoleName") as HTMLInputElement).value;
    const newPrivilege = parseInt((document.getElementById("newPrivilegeId") as HTMLInputElement).value);
    updateRole(roleId, newRoleName, newPrivilege); // Call the update function
});

