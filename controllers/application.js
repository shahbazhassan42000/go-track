import User from "../models/user.js";
import Application from "../models/application.js";
export default {
    create(req, res, next) {
        const data = req.body.application;
        if (!data) {
            return res.status(400).json("must provide application object in this format {application:{...}}");
        }
        if (!data.name) return res.status(400).json("Name can't be blank");
        if (!data.fatherName) return res.status(400).json("Father Name can't be blank");
        if (!data.relationship) return res.status(400).json("Relationship can't be blank");
        if (!data.fatherCNIC) return res.status(400).json("Father CNIC can't be blank");
        if (!data.fatherPhone) return res.status(400).json("Father Phone can't be blank");
        if (!data.CNIC) return res.status(400).json("CNIC can't be blank");
        if (!data.education) return res.status(400).json("Education can't be blank");
        if (!data.phone) return res.status(400).json("Phone can't be blank");
        if (!data.province) return res.status(400).json("Province can't be blank");
        if (!data.DOB) return res.status(400).json("Date of birth can't be blank");
        if (!data.address) return res.status(400).json("Address can't be blank");
        if (!data.email) return res.status(400).json("Email can't be blank");

        //set user ID
        data.userId = req.user.id;

        Application.create(data).then((application) => {
            if (application) {
                return res.status(200).json(application);
            }
        }, err => {
            console.log(err);
            return res.status(400).json("ERROR!!! While creating application.");
        }).catch(next);
    },
    getAll(req, res, next) {
        Application.findAll({ userId: req.user.id }).then((applications) => {
            if (applications) {
                return res.status(200).json(applications);
            }
        }, err => {
            console.log(err);
            return res.status(400).json("ERROR!!! While getting applications.");
        }).catch(next);
    }
};