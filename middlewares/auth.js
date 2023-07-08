import jwt from "jsonwebtoken";
import User from "../models/user.js";
export default {
  authenticate(req, res, next) {
    const secretKey = process.env.SECRET_KEY;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      console.log("token not found");
      return res.status(401).json('Unauthenticated');
    }
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.log("token not valid");
        return res.status(401).json('Unauthenticated');
      }
      //check if user is exists
      User.findByPk(user.id).then((user) => {
        if (!user) {
          return res.status(401).json('Unauthenticated');
        } else {
          console.log("user found");
          req.user = user;
          return next();
        }
      }).catch(err => {
        console.log(err);
        return res.status(401).json('Unauthenticated');
      });
    });
  },
  authorize(roles = []) {

    return [
      // authorize based on user role
      (req, res, next) => {
        if (typeof roles === 'string') {
          roles = [roles];
        }
        if (roles.length && !roles.includes(req.user.role)) {
          // user's role is not authorized
          console.log("user's role is not authorized");
          return res.status(403).json({ message: 'Unauthorized' });
        }

        // authentication and authorization successful
        next();
      },
    ];
  },
};
