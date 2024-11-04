// Waterfall/Webpage/API/routes/projectRoutes.ts
import {Router, Request, Response} from "express";
import {clearUserCache, getUserFromDBOrCache} from "../Service/UserService.js";
import {User} from "../../DB/Entities/User.js";

const router = Router();
// GET all projects

// @ts-ignore
router.get("/", async (_req: Request, res: Response) => {
    try {
        const users = await getUserFromDBOrCache();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({message: "Failed to fetch users"});
    }
});


// @ts-ignore
router.put("/:id", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const {user_email} = req.body;

    try {
        const user = await User.findOneBy({user_id: userId});
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        user.user_email = user_email;
        await user.save();
        clearUserCache();
        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Error updating user"});
    }
});


export default router;
