import express from "express";
import newLetterController from "../controllers/index.js"

const {Router} = express;
const {newsletter} = newLetterController;

const api = Router();

//adding email
api.post('/', newsletter.addEmail);

//getting all emails
api.get('/', newsletter.getAllEmails);

export default api;