import express from 'express'
import auth from '../middleware/auth.js'
import { getDashboardController } from '../controller/dashboard.controller.js'

const dashboardRouter = express.Router()

dashboardRouter.get("/", auth, getDashboardController)


export default dashboardRouter