import {Request, Response, Router} from "express";
import {authenticate} from "../authenticationMiddleware.js";
import {clearAllCache} from "../app.js";

const router = Router();
// Used for refreshing the page.
router.post("/", authenticate, async (_req: Request, res: Response) => {
    try {
        clearAllCache();
        res.json("Cleared all cache");
    } catch (error) {
        console.error("Error clearing cache", error);
        res.status(500).json({message: "Failed to clear cache"});
    }
});

export default router;