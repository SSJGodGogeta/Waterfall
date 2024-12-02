
document.addEventListener("DOMContentLoaded", () => {
    const requestVacationButton = document.getElementById("request-vacation-button") as HTMLButtonElement;
    const saveButton = document.getElementById("vacation-save-button") as HTMLButtonElement;
    const inputDialog = document.getElementById("vacation-dialog") as HTMLDialogElement;
    const form = document.getElementById('vacation-form') as HTMLFormElement;
    const cancelButton = document.getElementById('cancel-vacation-button') as HTMLButtonElement;

    requestVacationButton.onclick = () => {
        inputDialog.style.display = "flex";
    };
    saveButton.onclick = async () => {
        try {
            const entry = {
                startDate: (document.getElementById("vacation-date-start") as HTMLInputElement).value,
                start: (document.getElementById("vacation-start") as HTMLInputElement).value,
                endDate: (document.getElementById("vacation-date-end") as HTMLInputElement).value,
                end: (document.getElementById("vacation-end") as HTMLInputElement).value,
                techcode: (document.getElementById("vacation-techcode") as HTMLInputElement).value,
            };
            const hasEmptyField = Object.values(entry).some(value => value.trim() === "");
            if (hasEmptyField) {
                console.error("Cant save. One or more objects are empty but required.");
                return;
            }
            const response = await fetch("http://116.203.25.18:3000/api/vacation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(entry),
                credentials: "include"
            });

            if (!response.ok) {
                if (response.status == 401) {
                    window.location.href = "/Waterfall/Webpage/authentication/login.html"
                    return;
                }
                throw new Error("Failed to save new entry");
            }
            await response.json();
            window.location.reload();
        } catch (error) {
            console.error("Error saving entry:", error);
        }
    };
    cancelButton.onclick =  () => {
        form.reset();
        inputDialog.close();
        inputDialog.style.display = "none";
    }
});