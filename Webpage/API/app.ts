// Waterfall/Webpage/API/app.ts
import express from "express";
import cors from "cors";
import { dataSource } from "../DB/dataSource.js"; // Updated path
import roleRoutes from "./routes/roleRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authenticationRoute from "./routes/authenticationRoute.js";
import cacheRoute from "./routes/cacheRoute.js";
import calculateStatistics from "./routes/calculateStatistics.js";
import timeTableRoute from "./routes/timeTableRoute.js";
import vacationRoute from "./routes/vacationRoute.js";
import sicknessRoute from "./routes/sicknessRoute.js";
import dumbassRoute from "./routes/dumbassRoute.js";
import employeesRoute from "./routes/employeesRoute.js";

import cookieParser from "cookie-parser";
import {clearUserCache} from "./Service/UserService.js";
import {clearRolesCache} from "./Service/RolesService.js";
import {clearPrivilegeCache} from "./Service/PrivilegeService.js";
import {clearProjectCache} from "./Service/ProjectService.js";
import {clearStaffGroupCache} from "./Service/StaffGroupService.js";
import {clearStaffCache} from "./Service/StaffService.js";
import path from "node:path";





const serverIp = "116.203.25.18";
const frontendPort = "63342";
const app = express();
const PORT = 3000; // Port of the backend (Express)


app.use(express.static(path.join(__dirname, "../features")));

app.use(cors({
    origin: `http://${serverIp}:${frontendPort}`, // url of the frontend app. adapt as needed
    credentials: true, // allow sending credentials
}));
app.use(express.json());

// Initialize TypeORM Data Source
dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((error) => {
        console.log("Error during Data Source initialization:", error);
        process.exit(1); // Will close the app with code 1
    });

// use cookieParser to access the cookies, send with the request
app.use(cookieParser());

// Use role routes
app.use("/api/authentication", authenticationRoute)
app.use("/api/roles", roleRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);
app.use("/api/clearCache", cacheRoute)
app.use("/api/calculateStatistics", calculateStatistics);
app.use('/api/timetable', timeTableRoute);
app.use("/api/vacation", vacationRoute);
app.use("/api/sickness", sicknessRoute);
app.use("", dumbassRoute);
app.use("/api/employees", employeesRoute);
const server = app.listen(PORT, '0.0.0.0',() => {
    console.log(`Server running on http://${serverIp}:${PORT}`);
});


// Clearing all cache at once:
export function clearAllCache(){
    clearPrivilegeCache();
    clearProjectCache();
    clearRolesCache();
    clearStaffGroupCache();
    clearStaffCache();
    clearUserCache();
}

// Graceful shutdown handling
async function shutdown() {
    console.log("Shutting down server...");
    server.close(() => {
        console.log("HTTP server closed.");
    });

    try {
        await dataSource.destroy();
        console.log("Database connection closed.");
        process.exit(0); // Success exit code
    } catch (error) {
        console.error("Error during shutdown:", error);
        process.exit(1); // Failure exit code
    }
}

process.on('SIGINT', shutdown); // SIGINT and SIGTERM are commands that get executed in the background f.ex if u press Ctr+C in the console to stop the current process
process.on('SIGTERM', shutdown); // Had this in Betriebssystem ;)
/*
NOTE: For everyone: stop the app via CTRL+C instead of using the vs code / Webstorm feature to stop the app using the red button.
 Reason: The Red button kills the process instantly and doesnt allow shutdown() to run meaning that u still have a connection to the database!
 This can lead to leaks and performance issues
 */