import _ from "lodash";
import role from "../utils/role.js";
import { sendEmail } from "../utils/EmailSender.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Token from "../models/token.js";
import crypto from "crypto";
import { reset_password_email_content } from "../utils/index.js";

const { includes, keys, size } = _;

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
    user.name = undefined;
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
    const data = req.body.user;
    if (!data) {
      return res.status(400).json("must provide user object in this format {user:{...}}");
    }
    if (!data.id) return res.status(400).json("User ID can't be blank");

    User.findOne({
      where: { id: data.id }
    }).then((user) => {
      if (user) {
        // remove id and password from data
        data.password = undefined;
        user.update(data).then((u) => {
          if (u) {
            return res.status(200).json("User updated successfully");
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
};
