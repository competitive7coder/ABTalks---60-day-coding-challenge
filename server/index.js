import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import connectDB from './config/connectDb.js'
import auth from "./middleware/auth.js"
import { userLoginController, userLogOutController, userRefressingTokenController, userRegisterController } from './controller/user.controller.js'


const app = express()


// middlewires

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
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



connectDB().then(() => {
    app.listen(5000, () => {
        console.log("App is running on port 5000...")
    })
})
