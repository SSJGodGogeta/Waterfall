// Waterfall/Webpage/API/routes/projectRoutes.ts
import {Router, Request, Response} from "express";
import {clearUserCache, getUserFromDBOrCache} from "../Service/UserService.js";
import {User} from "../../DB/Entities/User.js";
import {authenticate} from "../authenticationMiddleware.js";

const router = Router();
// GET all projects

router.get("/", authenticate, async (_req: Request, res: Response) => {
    try {
        const users = await getUserFromDBOrCache();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({message: "Failed to fetch users"});
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const {user_email} = req.body;

    try {
        const user = await User.findOneBy({user_id: userId});
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
