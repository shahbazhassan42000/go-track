import express from "express";
import applicationController from "../controllers/index.js";
import auth from "../middlewares/auth.js";

const { Router } = express;
const { application } = applicationController;

const api = Router();


//get token by id
api.post('/', auth.authenticate, application.create);

//get all applications of logged in user
api.get('/', auth.authenticate, application.getAll);


export default api;