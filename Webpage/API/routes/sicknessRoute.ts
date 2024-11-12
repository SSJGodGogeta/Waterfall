import express, {Request, Response} from 'express';
import {authenticate} from "../authenticationMiddleware.js";
import {getStaffByKey} from "../Service/StaffService.js";
import {Staff} from "../../DB/Entities/Staff.js";
import {User} from "../../DB/Entities/User.js";
import {getUserByKey} from "../Service/UserService.js";
import {AbsenceType_Techcode} from "../../DB/Techcodes/AbsenceType_Techcode.js";
import {Absence} from "../../DB/Entities/Absence.js";
import {PermissionStatusTechcode} from "../../DB/Techcodes/PermissionStatus_Techcode.js";

const router = express.Router();

router.get('/', authenticate, async (req: Request, res: Response) => {
    try {
        const user = req.body.user
        const sicknessEntries = await Absence.find({
            where: {
                staff: {
                    staff_id: user.staff.staff_id,
                },
                type_techcode: AbsenceType_Techcode.SICK
            }, // Assuming staff_id is the foreign key in Timetable
            order: {
                start_time: 'ASC'
            },
        });
        res.json({sicknessEntries});
    } catch (error) {
        console.error("Error fetching sickness entries :", error);
        res.status(500).json({ message: "Failed to retrieve sick times" });
    }
});

router.post("/", authenticate, async (req: Request, res: Response) => {
    try {
        const session_token = req.cookies.session_token;
        const user: User|undefined = await getUserByKey("user_token", session_token);
        const { startDate, start, endDate, end} = req.body;
        if (!user) {
            console.error(`No user found with given token: ${session_token}!`);
            res.status(500).json({ error: "Failed to load user" });
            return;
        }
        const dStart = new Date (`${startDate}T${start}`);
        const dEnd = new Date (`${endDate}T${end}`);
        const staff: Staff|undefined =  await getStaffByKey("staff_id", user.staff.staff_id);
        if (!staff) {
            console.error(`No staff found with given id: ${user.staff.staff_id}!\nNot updating DB`);
            res.status(500).json({ error: "Failed to save entry" });
            return;
        }

        const newEntry = new Absence();
        newEntry.start_time = dStart;
        newEntry.end_time = dEnd;
        newEntry.type_techcode = AbsenceType_Techcode.SICK;
        newEntry.response = "Form successfully submitted! The HR department will look over this in short and get back to you!";
        newEntry.staff = staff;
        newEntry.permission_status = PermissionStatusTechcode.AKNOWLEDGED;
        await newEntry.save();
        res.status(201).json(newEntry);  // Return the saved entry
    } catch (error) {
        console.error("Error saving timetable entry:", error);
        res.status(500).json({ error: "Failed to save entry" });
    }
});

export default router;
