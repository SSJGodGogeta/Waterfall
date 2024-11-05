document.addEventListener("DOMContentLoaded", async function () {
    // get the projects container, into which the following code will put the individual projects
    const greeting_element: HTMLHeadingElement = document.getElementById("greeting") as HTMLHeadingElement;

    try {
        const response = await fetch(
            "http://localhost:3000/api/authentication/currentUser",
            {
                method: "GET",
                credentials: 'include', // allow receiving cookies
            }
        );

        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }

        const user = await response.json();
        console.log("Fetched user:", user);

        if (user.staff) {
            greeting_element.textContent = `Hello ${user.staff!.first_name} 👋`;
        }
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
});
