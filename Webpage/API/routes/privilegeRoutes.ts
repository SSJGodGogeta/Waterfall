// Waterfall/Webpage/API/routes/roleRoutes.ts
import {Router, Request, Response} from "express";
import {clearPrivilegeCache, getPrivilegeFromDBOrCache} from "../Service/PrivilegeService";
import {Privilege} from "../../DB/Entities/Privilege";
import {authenticate} from "../authenticationMiddleware.js"; // Adjusted path to Role entity

const router = Router();
// GET all roles

router.get("/", authenticate, async (_req: Request, res: Response) => {
    try {
        const privileges = await getPrivilegeFromDBOrCache();
        res.json(privileges);
    } catch (error) {
        console.error("Error fetching privileges:", error);
        res.status(500).json({message: "Failed to fetch privileges"});
    }
});

router.put("/:id", authenticate, async (req: Request, res: Response) => {
    const privilegeId = parseInt(req.params.id);
    const {privilegeTechcode} = req.body;

    try {
        const privilege = await Privilege.findOneBy({privilege_id: privilegeId});
        if (!privilege) {
            res.status(404).json({message: "Privilege not found"});
            return;
        }

        privilege.privilege_techcode = privilegeTechcode;
        await privilege.save();
        clearPrivilegeCache();
        res.json(privilege);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error updating privilege"});
        return;
    }
});


export default router;
