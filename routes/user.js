import express from "express";
import userController from "../controllers/index.js";
import auth from "../middlewares/auth.js";

const { Router } = express;
const { user } = userController;

const api = Router();


//get user by token
api.get('/getByToken', auth.authenticate, user.getByToken);

api.post('/login', user.login);

// create user
api.post('/', user.signup);

// reset password
api.post('/resetPassword', user.resetPassword);

// update password
api.put('/updatePassword/', user.updatePassword);

// update user
api.put('/', auth.authenticate, user.update);






export default api;
