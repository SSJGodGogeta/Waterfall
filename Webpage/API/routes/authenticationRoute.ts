// Waterfall/Webpage/API/routes/roleRoutes.ts
import {Router, Request, Response} from "express";
import {User} from "../../DB/Entities/User.js";
import {authenticate} from "../authenticationMiddleware.js"

const router = Router();

// @ts-ignore
router.post("/login", async (req: Request, res: Response) => {
    try {
        // get the email and the password, provided in the body
        let { request_body } = req.body;
        let email = request_body.email;
        let password = request_body.password;

        // get the user corresponding to the given email
        const user = await User.findOneBy({user_email: email});
        if (!user) {
            return res.status(401).json({message: "Email or password incorrect"});
        }

        // hash the given password using the bcrypt.js package and compare it to the stored hash
        let bcrypt = require('bcryptjs');
        if (!bcrypt.compareSync(password, user.user_password)) {
            return res.status(401).json({message: "Email or password incorrect"});
        }

        // ----------------------------------------------------------------------------------------------------------
        // reaching the following section of the code means that a valid combination of an email and a password
        // was provided by the user sending the post request, because otherwise the function would have exited already
        // ----------------------------------------------------------------------------------------------------------

        // generate the user aka session token and store it in the database
        const crypto = require('crypto');
        user.user_token = crypto.randomBytes(64).toString('hex'); // 128 characters (64 bytes in hex)
        await user.save();

        // Set the token as a secure HttpOnly cookie
        res.cookie('session_token', user.user_token, {
            httpOnly: true, // js cant access the cookie (prevent XSS Attacks)
            secure: true, // Only send over HTTPS
            sameSite: 'strict', // save but will not support cross site workflows like oauth2
            maxAge: 24 * 60 * 60 * 1000 // Cookie expiry (24 hours in milliseconds)
        });

        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({message: "Failed to process login"});
    }
});

// @ts-ignore
router.post("/logout", authenticate, async (req: Request, res: Response) => {
    try {
        // remove the user aka session token and with that log the user out
        let { request_body } = req.body;
        const user: User = request_body.user;

        user.user_token = '';
        await user.save();

        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error logging out:", error);
        return res.status(500).json({message: "Failed to process logout"});
    }
});

export default router;
