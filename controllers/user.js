import _ from "lodash";
import role from "../utils/role.js";
import { sendEmail } from "../utils/EmailSender.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Token from "../models/token.js";
import crypto from "crypto";
import formidable from "formidable";
import { reset_password_email_content } from "../utils/index.js";
import fsNative from "fs";
import { UPLOAD_PATH, __dirname } from "../utils/constants.js";

const { includes, keys, size } = _;

const updateProfile = (files, req, res, next, data) => {
  if (files?.image) {
    if (!fsNative.existsSync(`${__dirname}/${UPLOAD_PATH}/`)) {
      fsNative.mkdirSync(`${__dirname}/${UPLOAD_PATH}/`);
    }
    const oldpath = files.image[0].filepath;
    const newpath = `${__dirname}/${UPLOAD_PATH}/${files.image[0].originalFilename}`;
    fsNative.copyFile(oldpath, newpath, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Image copied successfully");
        data.image = `/uploads/${files.image[0].originalFilename}`;
        User.findOne({
          where: { id: req.user.id }
        }).then((user) => {
          if (user) {
            user.update({
              image: data.image
            });
          }
        });
        fsNative.unlink(oldpath, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Image deleted successfully");
          }
        });
      }
    });
  }//files?.image

  User.findOne({
    where: { id: req.user.id }
  }).then((user) => {
    if (user) {
      user.update(data).then((u) => {
        if (u) {
          console.log(u);
          u.password = undefined;
          return res.status(200).json(u);
        }
      }, err => {
        console.log(err);
        return res.status(400).json("ERROR!!! While updating user.");
      });
    } else {
      return res.status(404).json("User not found");
    }
  }).catch(err => {
    console.log(err);
    return res.status(400).json("ERROR!!! While updating user.");
  }).catch(next);
}

export default {
  login(req, res, next) {

    const user = req.body.user;
    if (!user) {
      return res.status(400).json("must provide user object in this format {user:{...}}");
    }

    if (!user.email) return res.status(400).json("Email can't be blank");
    if (!user.password) return res.status(400).json("Password can't be blank");

    User.findOne({
      where: {
        email: user.email,
        password: user.password
      }
    }).then((user) => {
      if (user) {
        // generate JWT token
        let expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 60);
        const token = jwt.sign({
          email: user.email,
          role: user.role,
          id: user.id,
          expiryDate: parseInt(expiryDate.getTime() / 1000)
        }, process.env.SECRET_KEY);
        return res.status(200).json(token);
      } else {
        return res.status(400).json("Invalid username or password");
      }
    }).catch(err => {
      console.log(err);
      return res.status(400).json("ERROR!!! While login.");
    }).catch(next);
  },
  signup(req, res, next) {
    const user = req.body.user;
    if (!user) {
      return res.status(400).json("must provide user object in this format {user:{...}}");
    }
    if (!user.name) return res.status(400).json("Name can't be blank");
    if (!user.email) return res.status(400).json("Email can't be blank");
    if (!user.password) return res.status(400).json("Password can't be blank");
    if (!user.role) return res.status(400).json("Role can't be blank");
    if (!includes(role, user.role)) return res.status(400).json("Invalid role");

    // check if email already exist
    User.findOne({
      where: { email: user.email }
    }).then((u) => {
      if (u) {
        return res.status(400).json("Email is already taken");
      } else {
        User.create(user).then((user) => {
          if (user) {
            return res.status(200).json(user);
          }
        }, err => {
          console.log(err);
          return res.status(400).json("ERROR!!! While signup.");
        });
      }
    }).catch(err => {
      console.log(err);
      return res.status(400).json("ERROR!!! While signup.");
    }).catch(next);
  },
  getByToken(req, res) {
    console.log("Getting user by token");
    const user = req.user;
    user.password = undefined;
    return res.status(200).json(user);
  },
  resetPassword(req, res, next) {
    const user = req.body.user;
    if (!user) {
      return res.status(400).json("must provide user object in this format {user:{...}}");
    }
    if (!user.email) return res.status(400).json("Email can't be blank");

    User.findOne({
      where: { email: user.email }
    }).then((user) => {
      if (user) {
        //create Token and send email
        Token.create({
          token: crypto.randomBytes(16).toString('hex'),
          userId: user.id
        }).then((token) => {
          if (token) {
            const URL = `${process.env.BASE_URL}/resetPassword.html?pass=${token.token}&id=${user.id}`;
            const subject = "Reset your Go-Track Password";
            const text = reset_password_email_content(user?.name, URL);
            const email = user?.email;
            sendEmail(email, subject, text).then(resp => {
              console.log(resp);
              return res.status(200).json("Email sent successfully");

            }).catch(err => {
              console.log(err);
              return res.status(400).json("ERROR!!! While resetting password.");
            })
          } else {
            return res.status(400).json("ERROR!!! While resetting password.");
          }
        }, err => {
          console.log(err);
          return res.status(400).json("ERROR!!! While resetting password.");
        });
      } else {
        return res.status(404).json("Email is not registered");
      }
    }).catch(err => {
      console.log(err);
      return res.status(400).json("ERROR!!! While resetting password.");
    }).catch(next);
  },
  updatePassword(req, res, next) {
    const data = req.body.user;
    if (!data) {
      return res.status(400).json("must provide user object in this format {user:{...}}");
    }
    if (!data.id) return res.status(400).json("User ID can't be blank");
    if (!data.password) return res.status(400).json("Password can't be blank");

    User.findOne({
      where: { id: data.id }
    }).then((user) => {
      if (user) {
        user.update({
          password: data.password
        }).then((u) => {
          if (u) {
            return res.status(200).json("Password updated successfully");
          }
        }, err => {
          console.log(err);
          return res.status(400).json("ERROR!!! While updating password.");
        });
      } else {
        return res.status(404).json("User not found");
      }
    }).catch(err => {
      console.log(err);
      return res.status(400).json("ERROR!!! While updating password.");
    }).catch(next);
  },
  update(req, res, next) {
    const form = formidable({});
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        return res.status(400).json("ERROR!!! While updating user.");
      }

      let data = {};
      if (fields.firstName) data.firstName = fields.firstName[0];
      if (fields.lastName) data.lastName = fields.lastName[0];
      if (fields.email) data.email = fields.email[0];
      if (fields.phone) data.phone = fields.phone[0];
      if (fields.country) data.country = fields.country[0];
      if (fields.province) data.province = fields.province[0];
      if (fields.education) data.education = fields.education[0];
      if (fields.CNIC) data.CNIC = fields.CNIC[0];
      if (fields.new_email) data.email = fields.new_email[0];
      if (fields.password) data.password = fields.password[0];

      //check if password is correct
      if (data.password) {
        if (fields.old_password[0] !== req.user.password) {
          return res.status(400).json("Incorrect password");
        }
      }

      // check if email already exist
      console.log(data.email, req.user.email);
      if (data.email && data.email !== req.user.email) {
        User.findOne({
          where: { email: data.email }
        }).then((y) => {
          if (y) {
            return res.status(400).json("Email is already taken");
          } else {
            // files,req,res,next,data
            updateProfile(files, req, res, next, data);
          }
        }).catch(err => {
          console.log(err);
          return res.status(400).json("ERROR!!! While updating user.");
        }).catch(next);
      } else {
        updateProfile(files, req, res, next, data);
      }
    });
  }
};
