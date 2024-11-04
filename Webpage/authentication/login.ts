// load the email-adress and the password field
let emailAdressInput: HTMLInputElement = document.getElementById("email") as HTMLInputElement;
let passwordInput: HTMLInputElement = document.getElementById("password") as HTMLInputElement;

// load the login button
let loginButton: HTMLButtonElement = document.getElementById("loginButton") as HTMLButtonElement;

// load the hidden error message
let loginError: HTMLParagraphElement = document.getElementById("loginError") as HTMLParagraphElement;

loginButton.onclick = function () {
    // hide the error message for a retry
    loginError.style.display = "none";

    let emailAdress: String = emailAdressInput.value!.trim().toLowerCase(); // trim and lowercase the email adress
    let password: String = passwordInput.value!; // read the password

    // TODO: implement the actual sign in process
    if (emailAdress === "kevin.schmidh@icloud.com" && password === "Kevin") {
        // if the login was successfull redirect to the dashboard
        window.location.href = "../features/dashboard/screens/dashboard.html";
        return;
    }

    // If the login failed, show an error message
    loginError.style.display = "block";
}