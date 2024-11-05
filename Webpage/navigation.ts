// load the buttons from the navigation bar
const dashboard_button: HTMLDataListElement = document.getElementById("dashboard") as HTMLDataListElement;
const my_work_times_button: HTMLDataListElement = document.getElementById("my_work_times") as HTMLDataListElement;
const my_vacations_button: HTMLDataListElement = document.getElementById("my_vacations") as HTMLDataListElement;
const sickness_button: HTMLDataListElement = document.getElementById("sickness") as HTMLDataListElement;

dashboard_button.onclick = function() {
    // go to the dashboard screen
    window.location.href = "/Waterfall/Webpage/features/dashboard/screens/dashboard.html";
}

my_work_times_button.onclick = function() {
    // go to the my work times screen
    window.location.href = "/Waterfall/Webpage/features/work_times/screens/my_work_times.html";
}

my_vacations_button.onclick = function() {
    // go to the my vacations screen
    window.location.href = "/Waterfall/Webpage/features/vacations/screens/my_vacations.html";
}

sickness_button.onclick = function() {
    // go to the sickness screen
    window.location.href = '/Waterfall/Webpage/features/sickness/screens/sickness.html';
}