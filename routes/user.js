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

//update user status
api.put('/status', auth.authenticate, auth.authorize('ADMIN'), user.updateStatus);

// get all users
api.get('/', auth.authenticate, auth.authorize('ADMIN'), user.getAll);

export default api;
