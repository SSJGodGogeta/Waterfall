// Waterfall/Webpage/API/app.ts
import express from "express";
import cors from "cors";
import { dataSource } from "../DB/dataSource.js"; // Updated path
import roleRoutes from "./routes/roleRoutes.js";


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

// Use role routes
app.use("/api/roles", roleRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
