import express from "express";
import applicationController from "../controllers/index.js";
import auth from "../middlewares/auth.js";

const { Router } = express;
const { application } = applicationController;

const api = Router();


//get token by id
api.post('/', auth.authenticate, application.create);

//get all applications of logged in user
api.get('/', auth.authenticate, application.getUserApplications);

//get application by id
api.get('/getByID/:id', auth.authenticate, application.getById);

//get all applications
api.get('/all', auth.authenticate, auth.authorize('ADMIN'), application.getAll);

// update application status
api.put('/status', auth.authenticate, auth.authorize('ADMIN'), application.updateStatus);

// get all application count group by status
api.get('/count', auth.authenticate, auth.authorize('ADMIN'), application.getCount);

// get all applications by status
api.get('/all/:status', auth.authenticate, auth.authorize('ADMIN'), application.getAllByStatus);


export default api;