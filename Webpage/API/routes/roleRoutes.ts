// Waterfall/Webpage/API/routes/roleRoutes.ts
import {Router, Request, Response} from "express";
import {Role} from "../../DB/Entities/Role.js";
import {clearRolesCache, getRolesFromDBOrCache} from "../DatabaseService.js"; // Adjusted path to Role entity

const router = Router();
// GET all roles

// @ts-ignore
router.get("/", async (_req: Request, res: Response) => {
    try {
        const roles = await getRolesFromDBOrCache();
        res.json(roles);
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({message: "Failed to fetch roles"});
    }
});


// @ts-ignore
router.put("/:id", async (req: Request, res: Response) => {
    const roleId = parseInt(req.params.id);
    const {role_name} = req.body;

    try {
        const role = await Role.findOneBy({role_id: roleId});
        if (!role) {
            return res.status(404).json({message: "Role not found"});
        }

        role.role_name = role_name;
        await role.save();
        clearRolesCache();
        return res.json(role);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Error updating role"});
    }
});


export default router;
