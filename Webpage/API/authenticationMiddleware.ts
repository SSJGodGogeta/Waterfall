import {NextFunction, Request, Response} from "express";
import {User} from "../DB/Entities/User.js";

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Retrieve the session token from the cookies send with the request
        const token = req.cookies.session_token;
        if (!token) {
            res.status(401).json({message: "Unauthorized"});
            return;
        }

        // Check if the token exists in the database
        const user = await User.findOne({
            where: { user_token: token },
            relations: {
                staff:true
            }
        });
        if (!user) {
            res.status(401).json({message: "Unauthorized"});
            return;
        }

        console.log(user.staff);

        // Attach user info to request for further processing in the following routes
        req.body.user = user;

        next(); // Proceed to the next route handler
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({message: "Failed to authenticate token"});
    }
};