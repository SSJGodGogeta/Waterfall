// Waterfall/Webpage/API/routes/projectRoutes.ts
import {Router, Request, Response} from "express";
import {authenticate} from "../authenticationMiddleware.js";
import {getStaffFromDBOrCache} from "../Service/StaffService";
import {Staff} from "../../DB/Entities/Staff";

const router = Router();
// GET all employees that belong to a supervisor
router.get("/:id", authenticate, async (req: Request, res: Response) => {
    try {
        const supervisorId: number = parseInt(req.params.id);
        const staff: Staff[]|null = await getStaffFromDBOrCache();

        const employees_of_supervisor: Staff[]|undefined = staff?.filter((staff) => staff.supervisor_id == supervisorId);

        res.json(employees_of_supervisor);
    } catch (error) {
        console.error("Error fetching employees of supervisor:", error);
        res.status(500).json({message: "Failed to fetch employees"});
    }
});
export default router;
