import _ from "lodash";
import role from "../utils/role.js";
import { sendEmail } from "../utils/EmailSender.js";

const { includes, keys, size } = _;


import UserSchema from "../models/user.js";













export default {
  login(req, res, next) {
    // if (!req.body.user || size(req.body.user) !== 2) {
    //   return res.sendStatus(400);
    // }
    // let check = check_login_requiredFields(req.body.user);
    // if (check !== "") {
    //   return res.status(400).json({ errors: check });
    // }
    // passport.authenticate("local", { session: false }, async function(err, user, info) {
    //   if (err) {
    //     return next(err);
    //   }
    //   if (user) {
    //     if (user.role !== "ADMIN" && user.status === "unverified") {
    //       let token = await Token.findOne({ userId: user._id });
    //       if (!token) {
    //         token = await new Token({ userId: user._id, token: crypto.randomBytes(16).toString("hex") }).save();
    //       }
    //       await sendVerificationEmail(user.email, user._id, token.token);
    //       return res.status(400).json("An email has been sent to your email address. Please verify your email address to login.");
    //     }
    //     const jwtToken = user.generateJWT();
    //     return res.status(200).json(jwtToken);
    //   } else {
    //     return res.status(400).json("Invalid username or password");
    //   }
    // })(req, res, next);
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
    UserSchema.findOne({
      where: { email: user.email }
    }).then((u) => {
      if (u) {
        return res.status(400).json("Email is already taken");
      } else {
        UserSchema.create(user).then((user) => {
          if (user) {
            return res.status(200).json(user);
          }
        }, err => {
          console.log(err);
          return res.status(400).json("ERROR!!! While signup.");
        });
      }
    });




    // if (!req.body.user) {
    //   return res.sendStatus(400);
    // }
    // let check = check_signup_requiredFields(req.body.user);
    // if (check !== "") {
    //   return res.status(400).json({ error: check });
    // }
    // let user = new User();
    // Object.assign(user, req.body.user);
    // if (user.role === "LABOR") Object.assign(user, { rating: 90, startingWage: 1000 });
    // if (user.role !== "ADMIN") Object.assign(user, { status: "unverified", profileCompleted: false });
    // validatePaymentMethod(user);
    // user.setPassword(req.body.user.password);
    //
    // //adding new labor type if not exist
    // if (user.type) AddNewLaborType(user.type);
    //
    //
    // user.save().then(async () => {
    //   //generating token for email verification
    //   if (user.role !== "ADMIN") {
    //     const token = await new Token({ userId: user._id, token: crypto.randomBytes(16).toString("hex") }).save();
    //     await sendVerificationEmail(user.email, user._id, token.token);
    //   }
    //   return res.status(201).json(`User created successfully with id: ${user._id}`);
    // }, error => {
    //   return res.status(400).json({
    //     type: keys(error.errors)[0],
    //     msg: error.errors[keys(error.errors)[0]]["properties"]["message"]
    //   });
    // }).catch(next);
  },
  verifyEmail(req, res, next) {
    // User.findOne({ _id: req.params.id }).then(user => {
    //   if (!user) {
    //     return res.status(400).json("Invalid link");
    //   }
    //   Token.findOne({ userId: user._id, token: req.params.token }).then(token => {
    //     if (!token) {
    //       return res.status(400).json("Invalid link");
    //     }
    //     // user.status = "verified";
    //     User.findByIdAndUpdate(user._id, { status: "verified" },
    //       function(err) {
    //         if (err) {
    //           return res.status(400).json("Error while verifying email, please try again later");
    //         } else {
    //           token.remove();
    //           return res.status(200).json("Email verified successfully");
    //         }
    //       });
    //   }).catch(err => {
    //     return res.status(400).json("error while verifying email");
    //   });
    // }).catch(err => {
    //   return res.status(400).json("ERROR while verifying email");
    // }).catch(next);
  },
  getByToken(req, res, next) {
    // const user = req.user;
    // //return everything except password and salt and hash
    // return res.status(200).json({ "user": filterUser(user) });
  },
  one(req, res, next) {
    // const username = req.params.username;
    // if (!username || username === "" || username === ":username") {
    //   return res.sendStatus(400);
    // }
    // console.log("Getting a user");
    // User.findOne({ username }).then(user => {
    //   if (user) return res.status(200).json({ user: user.toAuthJSON() });
    //   else next();
    // }).catch(next);
  },
  all(req, res) {
    // User.find({}).then(function(users) {
    //   if (users)
    //     return res.status(200).json(users);
    //   return res.status(404).json({ msg: "no users found" });
    // }, err => {
    //   console.log(err);
    //   return res.status(400).json({ msg: "ERROR!!! While fetching users." });
    // });

  },
  update(req, res, next) {
    // if (!req.body.user) return res.status(400).json("must provide user object in this format {user:{...}}");
    // let user = req.body.user;
    //
    // if (!user._id) return res.status(400).json("must provide user id in this format {user:{_id:...}}");
    //
    //
    // //adding new labor type if not exist
    // if (user.type) AddNewLaborType(user.type);
    // validatePaymentMethod(user);
    //
    // //updating profileCompleted
    // updateProfileCompleted(user);
    //
    // //removed username, password,email,role from update if exist
    // if (user.username) delete user.username;
    // if (user.password) delete user.password;
    // if (user.email) delete user.email;
    // if (user.role) delete user.role;
    //
    //
    // console.log("Updating user:...");
    // console.log(user);
    //
    // //update user
    // User.findByIdAndUpdate(user._id, { ...user }).then(updatedUser => {
    //   if (!updatedUser) return res.status(400).json("user not found against the given id");
    //   User.findById(user._id).then(user => {
    //     return res.status(200).json(user);
    //   });
    // }).catch(next);
    //
    //
    // // if (req.body.user) {
    // //   User.findByIdAndUpdate(req.body.user.id, { ...req.body.user},
    // //     function(err) {
    // //       if (err) {
    // //         return res.sendStatus(400);
    // //       } else {
    // //         User.findById(req.body.user.id).then(function(user) {
    // //           if (!user) {
    // //             return res.sendStatus(400);
    // //           }
    // //           return res.status(200).json(user);
    // //         }).catch(next);
    // //       }
    // //     });
    // // } else {
    // //   return res.sendStatus(400);
    // // }
  },
  delete(req, res) {
    // const user = req.body.user;
    // if (!user || size(user) !== 1) {
    //   return res.sendStatus(400);
    // }
    // if (!user.id) res.sendStatus(400);
    // User.findByIdAndRemove(user.id,
    //   function(err) {
    //     if (err) {
    //       return res.sendStatus(401);
    //     } else {
    //       return res.sendStatus(204);
    //     }
    //   });
  },
  checkEmail(req, res, next) {
    // const user = req.body.user;
    // if (!user || size(user) !== 2) {
    //   return res.sendStatus(400);
    // }
    // if (!user.email) return res.status(400).json({ error: "Email can't be blank" });
    // if (!user.role) return res.status(400).json({ error: "Role can't be blank" });
    // User.findOne({ email: user.email, role: user.role }).then(user => {
    //   if (user) return res.status(200).json({ status: "error", message: "Email is already taken" });
    //   else return res.status(200).json({ status: "success", message: "Email is available" });
    // }).catch(next);
  },
  getUsersByRole(req, res, next) {
    // const role = req.query.role;
    // User.find({ role }).then((users) => {
    //   if (users) {
    //     //filter users
    //     users = users.map(user => {
    //       return filterUser(user);
    //     });
    //     return res.status(200).json(users);
    //   }
    //   return res.status(404).json({ msg: "no users found" });
    // }, err => {
    //   return res.status(400).json({ msg: "ERROR!!! While fetching users." });
    // });
  }
};




export const filterUser = (user) => {
  user.hash = undefined;
  user.salt = undefined;
  user.__v = undefined;
  return user;
};

export const sendVerificationEmail = async (email, id, token) => {
  const URL = `${process.env.BASE_URL}/api/users/verification/${id}/verify/${token}`;
  const subject = "Email Verification";
  const text = `Please verify your email by clicking on the link: ${URL}`;
  await sendEmail(email, subject, text);
};
