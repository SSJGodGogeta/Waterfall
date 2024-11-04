"use strict";
// load the email-adress and the password field
let emailAdressInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
// load the login button
let loginButton = document.getElementById("loginButton");
// load the hidden error message
let loginError = document.getElementById("loginError");
loginButton.onclick = function () {
    // hide the error message for a retry
    loginError.style.display = "none";
    let emailAdress = emailAdressInput.value.trim().toLowerCase(); // trim and lowercase the email adress
    let password = passwordInput.value; // read the password
    // TODO: implement the actual sign in process
    if (emailAdress === "kevin.schmidh@icloud.com" && password === "Kevin") {
        // if the login was successfull redirect to the dashboard
        window.location.href = "../features/dashboard/screens/dashboard.html";
        return;
    }
    // If the login failed, show an error message
    loginError.style.display = "block";
};
