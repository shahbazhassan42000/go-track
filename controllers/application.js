import User from "../models/user.js";
import Application from "../models/application.js";
import formidable from "formidable";
import fsNative from "fs";
import { UPLOAD_PATH, __dirname } from "../utils/constants.js";

export default {
    create(req, res, next) {
        const form = formidable({});
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log(err);
                return res.status(400).json("ERROR!!! While submitting application.");
            }

            let data = {}; //name, father_name, father_CNIC, CNIC, DOB, phone, city, email, last_exam, passing_year, board, total_marks, roll_no, institute,stud_pic, CNIC_DOC, result_DOC
            if (!fields.name) return res.status(400).json("Name can't be blank");
            else data.name = fields.name[0];
            if (!fields.father_name) return res.status(400).json("Father Name can't be blank");
            else data.father_name = fields.father_name[0];
            if (!fields.father_CNIC) return res.status(400).json("Father CNIC can't be blank");
            else data.father_CNIC = fields.father_CNIC[0];
            if (!fields.CNIC) return res.status(400).json("CNIC can't be blank");
            else data.CNIC = fields.CNIC[0];
            if (!fields.DOB) return res.status(400).json("Date of birth can't be blank");
            else data.DOB = fields.DOB[0];
            if (!fields.phone) return res.status(400).json("Phone can't be blank");
            else data.phone = fields.phone[0];
            if (!fields.city) return res.status(400).json("City can't be blank");
            else data.city = fields.city[0];
            if (!fields.email) return res.status(400).json("Email can't be blank");
            else data.email = fields.email[0];
            if (!fields.last_exam) return res.status(400).json("Last exam can't be blank");
            else data.last_exam = fields.last_exam[0];
            if (!fields.passing_year) return res.status(400).json("Passing year can't be blank");
            else data.passing_year = fields.passing_year[0];
            if (!fields.board) return res.status(400).json("Board can't be blank");
            else data.board = fields.board[0];
            if (!fields.total_marks) return res.status(400).json("Total marks can't be blank");
            else data.total_marks = fields.total_marks[0];
            if (!fields.roll_no) return res.status(400).json("Roll no can't be blank");
            else data.roll_no = fields.roll_no[0];
            if (!fields.institute) return res.status(400).json("Institute can't be blank");
            else data.institute = fields.institute[0];

            data.userId = req.user.id; //set user ID
            //saving files
            if (!fsNative.existsSync(`${__dirname}/${UPLOAD_PATH}/`)) {
                fsNative.mkdirSync(`${__dirname}/${UPLOAD_PATH}/`);
            }
            // Student picture saving
            const oldpath = files.stud_pic[0].filepath;
            const newpath = `${__dirname}/${UPLOAD_PATH}/${files.stud_pic[0].originalFilename}`;
            fsNative.copyFile(oldpath, newpath, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Student Picture copied successfully");
                    data.stud_pic = `/uploads/${files.stud_pic[0].originalFilename}`;
                    fsNative.unlink(oldpath, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Student Picture deleted successfully");
                        }
                    });
                    //CNIC DOC saving
                    const oldpath2 = files.CNIC_DOC[0].filepath;
                    const newpath2 = `${__dirname}/${UPLOAD_PATH}/${files.CNIC_DOC[0].originalFilename}`;
                    fsNative.copyFile(oldpath2, newpath2, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("CNIC DOC copied successfully");
                            data.CNIC_DOC = `/uploads/${files.CNIC_DOC[0].originalFilename}`;
                            fsNative.unlink(oldpath2, (err) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("CNIC DOC deleted successfully");
                                }
                            });
                            //Result DOC saving
                            const oldpath3 = files.result_DOC[0].filepath;
                            const newpath3 = `${__dirname}/${UPLOAD_PATH}/${files.result_DOC[0].originalFilename}`;
                            fsNative.copyFile(oldpath3, newpath3, (err) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("Result DOC copied successfully");
                                    data.result_DOC = `/uploads/${files.result_DOC[0].originalFilename}`;
                                    fsNative.unlink(oldpath3, (err) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log("Result DOC deleted successfully");
                                        }
                                    });
                                    //creating application
                                    console.log("files saved successfully", data);
                                    Application.create(data).then((application) => {
                                        if (application) {
                                            return res.status(200).json(application);
                                        }
                                    }, err => {
                                        console.log(err);
                                        return res.status(400).json("ERROR!!! While creating application.");
                                    }).catch(next);
                                }
                            });
                        }
                    });
                }
            });
        });//end of form parse
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
    },
    getById(req, res, next) {
        if (!req.params.id) return res.status(400).json("must provide application id");
        Application.findOne({ where: { id: req.params.id } }).then((application) => {
            if (application) {
                return res.status(200).json(application);
            }
        }, err => {
            console.log(err);
            return res.status(400).json("ERROR!!! While getting application by id.");
        }).catch(next);
    }
};