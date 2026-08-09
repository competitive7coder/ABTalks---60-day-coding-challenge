import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import connectDB from './config/connectDB.js'

import challengeRoute from './routes/challenge.route.js'
import submissionRoute from './routes/submission.route.js'
import dashboardRouter from './routes/dashboard.route.js'
import taskRoute from './routes/task.route.js'
import adminRoute from './routes/admin.route.js'

import auth from "./middleware/auth.js"
import { userLoginController, userLogOutController, userRefressingTokenController, userRegisterController, getCurrentUserController, getLeaderboardController } from './controller/user.controller.js'


const app = express()


// third party middlewires
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', process.env.CLIENT_URL], // Allow all possible local variations
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(helmet({
    crossOriginResourcePolicy: false
}))


// Gateways
app.get("/", (req, res) => {
    return res.json({
        message: "Hello..."
    })
})

app.post("/sign-up", userRegisterController)
app.post("/sign-in", userLoginController)
app.post("/logout", userLogOutController)
app.get("/refreshToken", userRefressingTokenController)
app.get("/me", auth, getCurrentUserController)
app.get("/leaderboard", auth, getLeaderboardController)

// Route level middlewire
app.use("/api/challenge", challengeRoute)
app.use("/api/submission", submissionRoute)
app.use("/api/dashboard", dashboardRouter)
app.use("/api/tasks", taskRoute)
app.use("/api/admin", adminRoute)

connectDB().then(() => {
    app.listen(5000, () => {
        console.log("App is running on port 5000...")
    })
})
