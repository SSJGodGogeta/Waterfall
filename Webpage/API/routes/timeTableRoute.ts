// routes/timetableRoutes.ts
import express, { Request, Response } from 'express';
import {Timetable} from "../../DB/Entities/TimeTable.js";
import {authenticate} from "../authenticationMiddleware.js";
import {getStaffByKey} from "../Service/StaffService.js";
import {Staff} from "../../DB/Entities/Staff.js";

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

router.post("/", authenticate, async (req: Request, res: Response) => {
    try {
        const { date, weekday, start, end, pause_minutes, performed_hours, absence, difference_performed_target, staffId } = req.body;

        const newEntry = new Timetable();
        newEntry.date = new Date(date);
        newEntry.weekday = weekday;
        newEntry.start = new Date(`${date}T${start}`);
        newEntry.end = new Date(`${date}T${end}`);
        newEntry.pause_minutes = parseInt(pause_minutes);
        newEntry.performed_hours = parseFloat(performed_hours);
        newEntry.difference_performed_target = parseFloat(difference_performed_target);
        newEntry.abscence = absence;
        const staff: Staff|undefined =  await getStaffByKey("staff_id", staffId);
        if (!staff) {
            console.error(`No staff found with given id: ${staffId}!\nNot updating DB`);
            res.status(500).json({ error: "Failed to save entry" });
            return;
        }
        newEntry.staff = staff;
        await newEntry.save();
        res.status(201).json(newEntry);  // Return the saved entry
    } catch (error) {
        console.error("Error saving timetable entry:", error);
        res.status(500).json({ error: "Failed to save entry" });
    }
});

export default router;
