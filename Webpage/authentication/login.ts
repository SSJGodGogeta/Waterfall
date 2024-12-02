// load the email-adress and the password field
let emailAdressInput: HTMLInputElement = document.getElementById("email") as HTMLInputElement;
let passwordInput: HTMLInputElement = document.getElementById("password") as HTMLInputElement;

// load the login button
let loginButton: HTMLButtonElement = document.getElementById("loginButton") as HTMLButtonElement;

// load the hidden error message
let loginError: HTMLParagraphElement = document.getElementById("loginError") as HTMLParagraphElement;

loginButton.onclick = async function () {
   try {
       // hide the error message for a retry
       loginError.style.display = "none";

       let email: String = emailAdressInput.value!.trim().toLowerCase(); // trim and lowercase the email address
       let password: String = passwordInput.value!; // read the password

       const response = await fetch("http://116.203.25.18:3000/api/authentication/login", {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           credentials: 'include', // allow receiving cookies
           body: JSON.stringify({
               email: email,
               password: password,
           }), // Sending the new role name
       });

       if (!response.ok) {
           throw new Error(response.status + " - " + response.statusText);
       }

       console.log("Logged in successfully");
       window.location.href = "/Waterfall/Webpage/features/dashboard/screens/dashboard.html";
   } catch (e) {
       // If the login failed, show an error message and log the error
       console.error(e);
       loginError.style.display = "block";
   }
}