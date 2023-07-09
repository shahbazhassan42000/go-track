import User from "../models/user.js";
import Token from "../models/token.js";

export default {
    getByID(req, res, next) {
        if (!req.body.token) return res.status(400).json("must provide user object in this format {token:{...}}");
        if (!req.body.token.id) return res.status(400).json("User ID can't be blank");
        if (!req.body.token.token) return res.status(400).json("Token can't be blank");

        User.findOne({
            where: { id: req.body.token.id }
        }).then((user) => {
            if (!user) {
                return res.status(400).json("Invalid link");
            }
            Token.findOne({
                where: {
                    userId: req.body.token.id,
                    token: req.body.token.token,
                },
                order: [['createdAt', 'DESC']], 
            }).then((token) => {
                if (!token) {
                    return res.status(400).json("Invalid link or expired");
                }
                // remove the token from the database
                token.destroy().then(() => {
                    return res.status(200).json("Verified");
                }).catch(err => {
                    console.log(err);
                    return res.status(400).json("ERROR1!!! While getting token");
                }).catch(next);

            }).catch(err => {
                console.log(err);
                return res.status(400).json("ERROR2!!! While getting token");
            }).catch(next);

        }).catch(err => {
            console.log(err);
            return res.status(400).json("ERROR3!!! While getting token");
        }).catch(next);

    }
}