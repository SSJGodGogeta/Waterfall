// Waterfall/Webpage/API/app.ts
import express from "express";
import cors from "cors";
import { dataSource } from "../DB/dataSource.js"; // Updated path
import roleRoutes from "./routes/roleRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authenticationRoute from "./routes/authenticationRoute.js";
// @ts-ignore
import cookieParser from "cookie-parser";
import {clearUserCache} from "./Service/UserService.js";
import {clearRolesCache} from "./Service/RolesService.js";
import {clearPrivilegeCache} from "./Service/PrivilegeService.js";
import {clearProjectCache} from "./Service/ProjectService.js";
import {clearStaffGroupCache} from "./Service/StaffGroupService.js";
import {clearStaffCache} from "./Service/StaffService.js";
import cacheRoute from "./routes/cacheRoute.js";

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:63342', // url of the frontend app. adapt as needed
    credentials: true, // allow sending credentials
}));
app.use(express.json());

// Initialize TypeORM Data Source
dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((error) => console.log("Error during Data Source initialization:", error));

// use cookieParser to access the cookies, send with the request
app.use(cookieParser());

// Use role routes
app.use("/api/authentication", authenticationRoute)
app.use("/api/roles", roleRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);
app.use("/api/clearCache", cacheRoute)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
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