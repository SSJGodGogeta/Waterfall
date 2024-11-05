// Waterfall/Webpage/API/routes/roleRoutes.ts
import {Router, Request, Response} from "express";
import bcrypt from 'bcryptjs';
import crypto from "crypto";
import {User} from "../../DB/Entities/User.js";
import {authenticate} from "../authenticationMiddleware.js";
import {clearUserCache, getUserByKey} from "../Service/UserService.js";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
    try {
        // get the email and the password, provided in the body
        let { email, password } = req.body;

        // get the user corresponding to the given email
        const user:User|undefined = await getUserByKey("user_email", email);
        if (!user) {
            res.status(401).json({message: "Email or password incorrect"});
            return;
        }

        // hash the given password using the bcrypt.js package and compare it to the stored hash
        if (!bcrypt.compareSync(String(password), user.user_password)) {
            // uncomment the following line to show what a possible hash would be for a new password
            // console.log(bcrypt.hashSync(String(password), 10))

            res.status(401).json({message: "Email or password incorrect"});
            return;
        }

        // ----------------------------------------------------------------------------------------------------------
        // reaching the following section of the code is only executed when a valid combination of an email and password
        // was provided by the user sending the post request, because otherwise the function would have exited already
        // ----------------------------------------------------------------------------------------------------------

        // generate the user aka session token and store it in the database
        user.user_token = crypto.randomBytes(64).toString('hex'); // 128 characters (64 bytes in hex)
        await user.save();
        clearUserCache();

        // Set the token as a secure HttpOnly cookie
        res.cookie('session_token', user.user_token, {
            httpOnly: true, // js cant access the cookie (prevent XSS Attacks)
            secure: true, // Only send over HTTPS
            sameSite: 'strict', // save but will not support cross site workflows like oauth2
            maxAge: 24 * 60 * 60 * 1000 // Cookie expiry (24 hours in milliseconds)
        });

        res.status(200).json({ message: "Login successful" });
        return
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({message: "Failed to process login"});
        return;
    }
});

router.get("/currentUser", authenticate, async (req: Request, res: Response) => {
    try {
        const users = req.body.user;
        res.json(users);
    } catch (error) {
        console.error("Error getting current user:", error);
        res.status(500).json({message: "Failed to fetch current user"});
    }
});

router.post("/logout", authenticate, async (req: Request, res: Response) => {
    try {
        // remove the user aka session token and with that log the user out
        let { request_body } = req.body;
        const user: User = request_body.user;

        user.user_token = '';
        await user.save();
        clearUserCache();

        res.status(200).json({ message: "Logout successful" });
        return;
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({message: "Failed to process logout"});
        return;
    }
});

export default router;
