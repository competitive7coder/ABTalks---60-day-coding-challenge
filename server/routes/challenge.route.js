import express from 'express'

import auth from '../middleware/auth.js'
import { createChallenge, getChallengeByDay, getCurrentChallenge } from '../controller/challenge.controller.js'

const challengeRoute = express.Router()

challengeRoute.post("/create", auth, createChallenge)
challengeRoute.get("/current", auth, getCurrentChallenge)
challengeRoute.get("/:day", auth, getChallengeByDay)

export default challengeRoute