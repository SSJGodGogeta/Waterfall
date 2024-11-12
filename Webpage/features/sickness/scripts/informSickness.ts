
document.addEventListener("DOMContentLoaded", () => {
    const informSicknessButton = document.getElementById("inform-sickness-button") as HTMLButtonElement;
    const saveButton = document.getElementById("sickness-save-button") as HTMLButtonElement;
    const inputDialog = document.getElementById("sickness-dialog") as HTMLDialogElement;
    const form = document.getElementById('sickness-form') as HTMLFormElement;
    const cancelButton = document.getElementById('cancel-sickness-button') as HTMLButtonElement;

    informSicknessButton.onclick = () => {
        inputDialog.style.display = "flex";
    };
    saveButton.onclick = async () => {
        try {
            const entry = {
                startDate: (document.getElementById("sickness-date-start") as HTMLInputElement).value,
                start: (document.getElementById("sickness-start") as HTMLInputElement).value,
                endDate: (document.getElementById("sickness-date-end") as HTMLInputElement).value,
                end: (document.getElementById("sickness-end") as HTMLInputElement).value,
            };
            const hasEmptyField = Object.values(entry).some(value => value.trim() === "");
            if (hasEmptyField) {
                console.error("Cant save. One or more objects are empty but required.");
                return;
            }
            const response = await fetch("http://localhost:3000/api/sickness", {
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