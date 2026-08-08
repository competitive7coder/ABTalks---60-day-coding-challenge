import express from 'express'
import auth from '../middleware/auth.js'
import { createSubmission } from '../controller/submission.controller.js';

const submissionRoute = express.Router()

submissionRoute.post("/", auth, createSubmission);

export default submissionRoute