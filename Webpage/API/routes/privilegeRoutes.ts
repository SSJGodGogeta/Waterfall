// Waterfall/Webpage/API/routes/roleRoutes.ts
import {Router, Request, Response} from "express";
import {getPrivilegeByKey, getPrivilegeFromDBOrCache} from "../Service/PrivilegeService";
import {authenticate} from "../authenticationMiddleware.js";
import {Privilege} from "../../DB/Entities/Privilege.js"; // Adjusted path to Role entity

const router = Router();
// No need for a put here, as we dont want anyone to change privileges. Privilege is smth that is set up once and usually never touched again!
// This class is finished too
router.get("/", authenticate, async (_req: Request, res: Response) => {
    try {
        const privileges: Privilege[]|null = await getPrivilegeFromDBOrCache();
        res.json(privileges);
    } catch (error) {
        console.error("Error fetching privileges:", error);
        res.status(500).json({message: "Failed to fetch privileges"});
    }
});

router.get("/:id", authenticate, async (req: Request, res: Response) => {
    try {
        const privilegeId:number = parseInt(req.params.id);
        const privilege: Privilege|undefined = await getPrivilegeByKey("privilege_id", privilegeId);
        res.json(privilege);
    } catch (error) {
        console.error("Error fetching privileges:", error);
        res.status(500).json({message: "Failed to fetch privileges"});
    }
});
export default router;
