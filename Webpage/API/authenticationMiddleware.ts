import {NextFunction, Request, Response} from "express";
import {getUserByKey} from "./Service/UserService.js";

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Retrieve the session token from the cookies send with the request
        const token = req.cookies.session_token;
        if (!token) {
            res.status(401).json({message: "Unauthenticated #1"});
            console.error("No token");
            //return;
        }

        // Check if the token exists in the database
        const user = await getUserByKey("user_token", token);
        if (!user) {
            console.error("No user");
            //res.status(401).json({message: "Unauthenticated #2"});
            // return;
        }
        console.log(`Authenticated staff: ${user?.staff?.first_name} ${user?.staff?.last_name}`);

        // Attach user info to request for further processing in the following routes
        req.body.user = user;

        next(); // Proceed to the next route handler
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({message: "Failed to authenticate token"});
    }
};