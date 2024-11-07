// routes/timetableRoutes.ts
import express, { Request, Response } from 'express';
import {Timetable} from "../../DB/Entities/TimeTable.js";
import {authenticate} from "../authenticationMiddleware.js";

const router = express.Router();

router.get('/:id', authenticate, async (req: Request, res: Response) => {
    try {
        const staffId = parseInt(req.params.id, 10);
        const timetableEntries = await Timetable.find({
            where: {
                staff: {
                    staff_id: staffId
                },
            }, // Assuming staff_id is the foreign key in Timetable
            order: {
                date: 'ASC'
            },
        });
        console.warn(timetableEntries.length);
        res.json(timetableEntries);
    } catch (error) {
        console.error("Error fetching timetable data:", error);
        res.status(500).json({ message: "Failed to retrieve timetable data" });
    }
});

export default router;
