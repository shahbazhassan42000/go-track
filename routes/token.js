import express from "express";
import tokenController from "../controllers/index.js";

const { Router } = express;
const { token } = tokenController;

const api = Router();


//get token by id
api.post('/verification', token.getByID);
api.post('/emailVerification', token.verifyEmail);


export default api;