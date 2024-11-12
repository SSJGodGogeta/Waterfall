// routes/timetableRoutes.ts
import express, { Request, Response } from 'express';
import {Timetable} from "../../DB/Entities/TimeTable.js";
import {authenticate} from "../authenticationMiddleware.js";
import {getStaffByKey} from "../Service/StaffService.js";
import {Staff} from "../../DB/Entities/Staff.js";
import {User} from "../../DB/Entities/User.js";
import {getUserByKey} from "../Service/UserService.js";
import {getWeekday} from "./calculateStatistics.js";
import {AbsenceType_Techcode} from "../../DB/Techcodes/AbsenceType_Techcode.js";

const router = express.Router();

router.get('/', authenticate, async (req: Request, res: Response) => {
    try {
        const user = req.body.user
        const timetableEntries = await Timetable.find({
            where: {
                staff: {
                    staff_id: user.staff.staff_id
                },
            }, // Assuming staff_id is the foreign key in Timetable
            order: {
                date: 'ASC'
            },
        });

        res.json({timetableEntries});
    } catch (error) {
        console.error("Error fetching timetable data:", error);
        res.status(500).json({ message: "Failed to retrieve timetable data" });
    }
});

router.post("/", authenticate, async (req: Request, res: Response) => {
    try {
        const session_token = req.cookies.session_token;
        const user: User|undefined = await getUserByKey("user_token", session_token);
        console.error(`User is: ${user}`)
        const { date, start, end, pause_minutes, absence } = req.body;
        if (!user) {
            console.error(`No user found with given token: ${session_token}!`);
            res.status(500).json({ error: "Failed to load user" });
            return;
        }
        const dDate = new Date(date);
        const dStart = new Date (`${date}T${start}`);
        const dEnd = new Date (`${date}T${end}`);
        const pMinutes: string = pause_minutes ?? "";
        let iPause_minutes = 0;
        if (pMinutes.trim().length > 0 && !pMinutes.match("\w")) {
            iPause_minutes = parseInt(pMinutes);
        }
        const aAbsence:AbsenceType_Techcode = absence ?? "";
        const workedMinutes = ((dEnd.getTime() - dStart.getTime()) / 60000) - iPause_minutes; // Time in minutes
        const staff: Staff|undefined =  await getStaffByKey("staff_id", user.staff.staff_id);
        if (!staff) {
            console.error(`No staff found with given id: ${user.staff.staff_id}!\nNot updating DB`);
            res.status(500).json({ error: "Failed to save entry" });
            return;
        }

        const newEntry = new Timetable();
        newEntry.date = dDate;
        newEntry.weekday = getWeekday(dDate);
        newEntry.start = dStart;
        newEntry.end = dEnd;
        newEntry.performed_hours = workedMinutes/60;
        newEntry.pause_minutes = iPause_minutes;
        newEntry.abscence = aAbsence;
        newEntry.difference_performed_target = (workedMinutes/60) - user.staff.target_hours;
        newEntry.staff = staff;
        console.error(`Staff id is : ${staff.staff_id}`)
        await newEntry.save();
        res.status(201).json(newEntry);  // Return the saved entry
    } catch (error) {
        console.error("Error saving timetable entry:", error);
        res.status(500).json({ error: "Failed to save entry" });
    }
});

export default router;
