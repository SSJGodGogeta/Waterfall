// Waterfall/Webpage/API/routes/roleRoutes.ts
import {Router, Request, Response} from "express";
import {clearPrivilegeCache, getPrivilegeFromDBOrCache} from "../Service/PrivilegeService";
import {Privilege} from "../../DB/Entities/Privilege"; // Adjusted path to Role entity

const router = Router();
// GET all roles

// @ts-ignore
router.get("/", async (_req: Request, res: Response) => {
    try {
        const privileges = await getPrivilegeFromDBOrCache();
        res.json(privileges);
    } catch (error) {
        console.error("Error fetching privileges:", error);
        res.status(500).json({message: "Failed to fetch privileges"});
    }
});


// @ts-ignore
router.put("/:id", async (req: Request, res: Response) => {
    const privilegeId = parseInt(req.params.id);
    const {privilegeTechcode} = req.body;

    try {
        const privilege = await Privilege.findOneBy({privilege_id: privilegeId});
        if (!privilege) {
            return res.status(404).json({message: "Privilege not found"});
        }

        privilege.privilege_techcode = privilegeTechcode;
        await privilege.save();
        clearPrivilegeCache();
        return res.json(privilege);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Error updating privilege"});
    }
});


export default router;
