import Newsletter from "../models/newsletter.js";
import {emailRegex} from "../utils/index.js";

export default {
    addEmail(req, res, next) {
        const email = req.body.email;
        if (!email) return res.status(400).send("Email is required");
        //validate email
        if (!email.match(emailRegex)) {
            return res.status(400).send("Please enter a valid email address");
        }
        let subscribed = req.body.subscribed;
        if (subscribed === undefined) subscribed = true;
        //check if email already exists then update the subscribed status
        Newsletter.findOne({where: {email: email}})
            .then(newsletter => {
                if (newsletter) {
                    //update the subscribed status
                    newsletter.update({subscribed: subscribed})
                        .then(updated => {
                            res.status(200).send(`Updated subscription status for ${email} to ${subscribed}`);
                        })
                        .catch(err => {
                            next(err);
                        });
                } else {
                    //create a new newsletter entry
                    Newsletter.create({email: email, subscribed: subscribed})
                        .then(created => {
                            res.status(201).send(`Added ${email} to the newsletter list with subscription status ${subscribed}`);
                        })
                        .catch(err => {
                            next(err);
                        });
                }
            })
            .catch(err => {
                next(err);
            });
    },
    getAllEmails(req, res, next) {
        Newsletter.findAll()
            .then(newsletters => {
                res.status(200).send(newsletters);
            })
            .catch(err => {
                next(err);
            });
    }
};