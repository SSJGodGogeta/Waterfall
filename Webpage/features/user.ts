/*
This function loads information concerning the currently logged in user
 */

document.addEventListener("DOMContentLoaded", async function () {
    // get the projects container, into which the following code will put the individual projects
    const greeting_element: HTMLHeadingElement|null = document.getElementById("greeting") as HTMLHeadingElement|null;

    const profile_picture: HTMLImageElement = document.getElementById("profile_picture") as HTMLImageElement;
    const name: HTMLHeadingElement = document.getElementById("name") as HTMLHeadingElement;
    const role: HTMLParagraphElement = document.getElementById("role") as HTMLParagraphElement;

    try {
        let user;
        const entityJSON = sessionStorage.getItem("user");

        if (entityJSON) {
            const entityObj = JSON.parse(entityJSON);
            // convert the object to a user entity
            user = Object.assign(entityObj);
        } else {
            window.location.href = "/Webpage/authentication/login.html";
            return;
        }

        if (!user) {
            window.location.href = "/Webpage/authentication/login.html";
            return;
        }
        console.log("Fetched user:", user);

        if (user!.staff) {
            if (greeting_element) {
                greeting_element.textContent = `Hello ${user.staff!.first_name} 👋`;
            }

            if (user.user_imageurl) {
                profile_picture.src = user.user_imageurl;
            }
            name.textContent = `${user.staff.first_name} ${user.staff.last_name}`;
            role.textContent = `${user.staff.role.role_name} at STC`;
        }
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
});
