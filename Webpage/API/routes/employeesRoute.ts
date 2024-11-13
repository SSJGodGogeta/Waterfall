// Waterfall/Webpage/API/routes/projectRoutes.ts
import {Request, Response, Router} from "express";
import {authenticate} from "../authenticationMiddleware.js";
import {getStaffFromDBOrCache} from "../Service/StaffService.js";
import {Staff} from "../../DB/Entities/Staff.js";
import {Privilige_Techcode} from "../../DB/Techcodes/Privilige_Techcode.js";

const router = Router();
// GET all employees that belong to a supervisor
router.get("/", authenticate, async (req: Request, res: Response) => {
    try {
        const supervisorId: number = req.body.user.staff_id;
        let staff_members: Staff[]|null = await getStaffFromDBOrCache();
        if (!staff_members) {
            res.status(404).json("Failed to find staff members");
            return;
        }

        const privilege: Privilige_Techcode = req.body.user.staff.role.privilege.privilege_techcode;

        if (privilege == Privilige_Techcode.EMPLOYEE) {
            res.status(403).json("Permission denied");
            return;
        }

        // empty if the user is no supervisor or has no assigned employees
        if (privilege == Privilige_Techcode.SUPERVISOR) {
            staff_members = staff_members?.filter((staff) => staff.supervisor_id == supervisorId);
        }

        res.json(staff_members);
    } catch (error) {
        console.error("Error fetching employees of supervisor:", error);
        res.status(500).json({message: "Failed to fetch employees"});
    }
});
export default router;
