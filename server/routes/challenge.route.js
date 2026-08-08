import express from 'express'

import auth from '../middleware/auth.js'
import { createChallenge, getChallengeByDay, getCurrentChallenge } from '../controller/challenge.controller.js'
import { submitChallenge, getUserSubmissions } from '../controller/submission.controller.js'

const challengeRoute = express.Router()

challengeRoute.post("/create", auth, createChallenge)
challengeRoute.get("/current", auth, getCurrentChallenge)
challengeRoute.post("/submit", auth, submitChallenge)
challengeRoute.get("/submissions/all", auth, getUserSubmissions)
challengeRoute.get("/:day", auth, getChallengeByDay)

export default challengeRoute