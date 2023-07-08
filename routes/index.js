import express from "express";
import user from "./user.js";
import token from "./token.js"
import newsletter from "./newsletter.js";
import { sendEmail } from "../utils/EmailSender.js";

const { Router } = express;
const api = Router();

// user apis
api.use("/user", user);


//token apis
api.use("/token", token);

//Newsletter apis
api.use("/newsletter", newsletter);


api.use("/sendEmail", async (req, res, next) => {
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
    if (!email || !email.trim()) {
        return res.status(400).send("Email is required");
    }
    if (!subject || !subject.trim()) {
        return res.status(400).send("Subject is required");
    }
    if (!message || !message.trim()) {
        return res.status(400).send("Message is required");
    }
    try {
        const result = await sendEmail(email, subject, message);
        if (result) return res.status(200).send("Email sent successfully");
        else return res.status(500).send("Error while sending email");
    } catch (err) {
        return res.status(500).send("Error while sending email");
    }
})


export default api;




