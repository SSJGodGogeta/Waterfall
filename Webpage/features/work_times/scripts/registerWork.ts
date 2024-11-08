
document.addEventListener("DOMContentLoaded", () => {
    const addTimeButton = document.getElementById("add-time-button") as HTMLButtonElement;
    const saveButton = document.getElementById("add-time-save-button") as HTMLButtonElement;
    const inputDialog = document.getElementById("work-time-dialog") as HTMLDialogElement;
    const form = document.getElementById('work-time-form') as HTMLFormElement;
    const cancelButton = document.getElementById('cancel-add-time-button') as HTMLButtonElement;

    addTimeButton.onclick = () => {
        inputDialog.style.display = "flex";
    };
    saveButton.onclick = async () => {
        try {
            const entry = {
                date: (document.getElementById("work-time-date") as HTMLInputElement).value,
                start: (document.getElementById("work-time-start") as HTMLInputElement).value,
                end: (document.getElementById("work-time-end") as HTMLInputElement).value,
                pause_minutes: (document.getElementById("work-time-pause") as HTMLInputElement).value,
                absence: (document.getElementById("work-time-absence") as HTMLInputElement).value,
            };
            const hasEmptyField = Object.values(entry).some(value => value.trim() === "");
            if (hasEmptyField) {
                console.error("Cant save. One or more objects are empty but required.");
                return;
            }
                const response = await fetch("http://localhost:3000/api/timetable", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(entry),
                credentials: "include"
            });

            if (!response.ok) {
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