import express from "express";
import user from "./user.js";
import token from "./token.js"
import { sendEmail } from "../utils/EmailSender.js";
import application from "./application.js";
import { contact_us_email_content } from "../utils/index.js";
import { EMAIL_USER } from "../utils/constants.js";

const { Router } = express;
const api = Router();

// user apis
api.use("/user", user);


//token apis
api.use("/token", token);

// application apis
api.use("/application", application);


// contact-us api
api.use("/contact-us", (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    if (!name || !name.trim()) {
        return res.status(400).send("Name is required");
    }
    if (!email || !email.trim()) {
        return res.status(400).send("Email is required");
    }
    if (!subject || !subject.trim()) {
        return res.status(400).send("Subject is required");
    }
    if (!message || !message.trim()) {
        return res.status(400).send("Message is required");
    }

    sendEmail(EMAIL_USER, subject, contact_us_email_content(name, email, message)).then(resp => {
        console.log(resp);
        return res.status(200).json("Message sent successfully");

    }).catch(err => {
        console.log(err);
        return res.status(400).json("ERROR!!! While sending message.");
    })
});



export default api;




