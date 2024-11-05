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

const app = express();
const PORT = 3000;

app.use(cors());
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
