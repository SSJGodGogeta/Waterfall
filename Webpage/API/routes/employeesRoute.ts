// Waterfall/Webpage/API/routes/projectRoutes.ts
import {Request, Response, Router} from "express";
import {authenticate} from "../authenticationMiddleware.js";
import {getStaffFromDBOrCache} from "../Service/StaffService.js";
import {Staff} from "../../DB/Entities/Staff.js";
import {Privilige_Techcode} from "../../DB/Techcodes/Privilige_Techcode.js";
import {Absence} from "../../DB/Entities/Absence.js";
const router = Router();
// GET all employees that belong to a supervisor
router.get("/", authenticate, async (req: Request, res: Response) => {
    try {
        const supervisorId: number = req.body.user.staff.staff_id;
        console.warn("SupervisorId: ", supervisorId);
        let staff_members: Staff[]|null = await getStaffFromDBOrCache();
        if (!staff_members) {
            res.status(404).json("Failed to find staff members");
            return;
        }

        const privilege: Privilige_Techcode = req.body.user.staff.role.privilege.privilege_techcode;
        console.warn(privilege);
        if (privilege == Privilige_Techcode.EMPLOYEE) {
            res.status(403).json("Permission denied");
            return;
        }

        // empty if the user is no supervisor or has no assigned employees
        if (privilege == Privilige_Techcode.SUPERVISOR) {
            staff_members = staff_members.filter((staff) => staff.supervisor_id == supervisorId);
            console.warn("Going through here");
        }

        res.json(staff_members);
    } catch (error) {
        console.error("Error fetching employees of supervisor:", error);
        res.status(500).json({message: "Failed to fetch employees"});
    }
});

router.post("/:id", authenticate, async (req: Request, res: Response) => {
    console.warn("Requirements body: ", req.body);
    const { PermissionStatus } = req.body;
    const absenceId = parseInt(req.params.id);
    const absence = await Absence.findOne({
        where:{
            absence_id: absenceId,
        }
    });
    if (!absence) {
        res.status(404).json(`Couldnt find a absence entry with given ID: ${absenceId}`);
        return;
    }
    absence.permission_status = PermissionStatus;
    console.error(absence.permission_status);
    console.error("\n\nSAVING PERMISSION STATUS\n\n");
    await absence.save();
    try {
        const response = await fetch(
            "http://localhost:3000/api/clearCache",
            {
                method: "POST",
                credentials: 'include', // allow receiving cookies
            }
        );
        if (!response.ok) {
            if (response.status == 401) {
                return;
            }
            throw new Error("Network response was not ok " + response.statusText);
        }
        window.location.reload();
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
    res.status(201).json(absence);  // Return the saved entry

});
export default router;
