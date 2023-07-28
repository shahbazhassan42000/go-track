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
        if (!data.gender) return res.status(400).json("Gender can't be blank");
        if (!data.matric) return res.status(400).json("Matric marks can't be blank");
        if (!data.intermediate) return res.status(400).json("intermediate marks can't be blank");
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
    getUserApplications(req, res, next) {
        console.log("Getting user applications...");
        console.log(req.user);
        Application.findAll({ where: { userId: req.user.id } }).then((applications) => {
            if (applications) {
                console.log(applications);
                return res.status(200).json(applications);
            }
        }, err => {
            console.log(err);
            return res.status(400).json("ERROR!!! While getting applications.");
        }).catch(next);
    },
    getAll(req, res, next) {
        Application.findAll().then((applications) => {
            if (applications) {
                return res.status(200).json(applications);
            }
        }, err => {
            console.log(err);
            return res.status(400).json("ERROR!!! While getting applications.");
        }).catch(next);
    },
    updateStatus(req, res, next) {
        const data = req.body.application;
        if (!data) {
            return res.status(400).json("must provide application object in this format {application:{...}}");
        }
        if (!data.id) {
            return res.status(400).json("must provide application id");
        }
        if (!data.status) {
            return res.status(400).json("must provide application status");
        }
        if (data.status !== "Pending" && data.status !== "Received" && data.status !== "Approved" && data.status !== "Rejected") return res.status(400).json("status must be Received, Pending, Approved or Rejected");
        Application.update({ status: data.status }, { where: { id: data.id } }).then((application) => {
            if (application) {
                return res.status(200).json("Application updated successfully");
            }
        }, err => {
            console.log(err);
            return res.status(400).json("ERROR!!! While updating application status.");
        }).catch(next);
    },
    getCount(req, res, next) {
        Application.findAll({
            attributes: ['status', [Application.sequelize.fn('COUNT', Application.sequelize.col('status')), 'count']],
            group: ['status']
        }).then((applications) => {
            if (applications) {
                return res.status(200).json(applications);
            }
        }, err => {
            console.log(err);
            return res.status(400).json("ERROR!!! While getting applications count.");
        }).catch(next);
    },
    getAllByStatus(req, res, next) {
        if (!req.params.status) return res.status(400).json("must provide status");
        if (req.params.status !== "pending" && req.params.status !== "received" && req.params.status !== "approved" && req.params.status !== "rejected") return res.status(400).json("status must be pending, approved or rejected");
        Application.findAll({ where: { status: req.params.status } }).then((applications) => {
            if (applications) {
                return res.status(200).json(applications);
            }
        }, err => {
            console.log(err);
            return res.status(400).json("ERROR!!! While getting applications by status.");
        }).catch(next);
    }
};