// Waterfall/Webpage/API/routes/projectRoutes.ts
import {Router, Request, Response} from "express";
import {clearUserCache, getUserByKey, getUsersFromDBOrCache} from "../Service/UserService.js";
import {User} from "../../DB/Entities/User.js";
import {authenticate} from "../authenticationMiddleware.js";

const router = Router();
// GET all projects

router.get("/", authenticate, async (_req: Request, res: Response) => {
    try {
        const users:User[]|null = await getUsersFromDBOrCache();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({message: "Failed to fetch users"});
    }
});

router.get("/:id", authenticate, async (req: Request, res: Response) => {
    try {
        const userId:number = parseInt(req.params.id);
        const user: User|undefined = await getUserByKey("user_id", userId);
        res.json(user);
    } catch (error) {
        console.error("Error fetching privileges:", error);
        res.status(500).json({message: "Failed to fetch users"});
    }
});
// TODO declared by Arman: Discuss if its needed to change other attributes of this entity. F.ex user_password
router.put("/:id", async (req: Request, res: Response) => {
    const {user_email} = req.body;
    try {
        const userId:number = parseInt(req.params.id);
        const user:User|undefined = await getUserByKey("user_id", userId);
        if (!user) {
            res.status(404).json({message: "User not found"});
            return;
        }

        user.user_email = user_email;
        await user.save();
        clearUserCache();

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error updating user"});
        return;
    }
});


export default router;
