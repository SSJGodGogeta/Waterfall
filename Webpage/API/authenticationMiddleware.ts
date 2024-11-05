import {Request, Response} from "express";
import {User} from "../DB/Entities/User.js";

// @ts-ignore
export const authenticate = async (req: Request, res: Response, next) => {
    try {
        // Retrieve the session token from the cookies send with the request
        const token = req.cookies.session_token;
        if (!token) {
            return res.status(401).json({message: "Unauthorized"});
        }

        // Check if the token exists in the database
        const user = await User.findOneBy({ user_token: token });
        if (!user) {
            return res.status(401).json({message: "Unauthorized"});
        }

        // Attach user info to request for further processing in the following routes
        req.body.user = user;

        next(); // Proceed to the next route handler
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({message: "Failed to authenticate token"});
    }
};