// Waterfall/Webpage/API/routes/roleRoutes.ts
import {Router, Request, Response} from "express";
import {Role} from "../../DB/Entities/Role.js";
import {clearRolesCache, getRolesFromDBOrCache} from "../Service/RolesService.js";
import {Privilege} from "../../DB/Entities/Privilege.js";
import {authenticate} from "../authenticationMiddleware.js"; // Adjusted path to Role entity

const router = Router();
router.get("/", authenticate, async (_req: Request, res: Response) => {
    try {
        const roles = await getRolesFromDBOrCache();
        res.json(roles);
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({message: "Failed to fetch roles"});
    }
});

router.put("/:id", authenticate, async (req: Request, res: Response) => {
    const roleId = parseInt(req.params.id);
    const { role_name, privilege_id } = req.body;
    const validRoleName = role_name && role_name.trim().length > 0;
    const pId = parseInt(privilege_id);
    const privilege: Privilege | null = pId ? await Privilege.findOne({where: {privilege_id: privilege_id}}) : null;
    try {
        const role = await Role.findOneBy({role_id: roleId});
        if (!role) {
            console.warn("Role not found. Adding new Role to DB");
            if (validRoleName && privilege) {
                const newRole = new Role();
                newRole.role_name = role_name;
                newRole.privilege = privilege;
                await newRole.save();
                res.send(`Role with ID: ${newRole.role_id}, Name: ${newRole.role_name} and PrivilegeID: ${newRole.privilege.privilege_id} has been added to the DB`);
                res.json(role);
            }
            else {
                res.status(404).json({message: "Could not add new Role to DB because of invalid roleName or invalid privilegeID"});
                console.warn("Could not add new Role to DB because of invalid roleName or invalid privilegeID");
            }
        } else {
            if (validRoleName) role.role_name = role_name;
            // Update the Privilege relationship if privilege_id is provided
            if (privilege) role.privilege = privilege;
            await role.save();
            res.json(role);
        }
        clearRolesCache();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error updating role"});
        return;
    }
});


export default router;
