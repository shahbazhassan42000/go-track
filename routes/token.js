import express from "express";
import tokenController from "../controllers/index.js";

const { Router } = express;
const { token } = userController;

const api = Router();


//get token by id
api.get('/:id', auth.authenticate, token.getByID);


export default api;