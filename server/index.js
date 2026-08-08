import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import connectDB from './config/connectDb.js'


const app = express()

// app.use(cors({
//     credentials: true,
//     origin: process.env.FRONTENT_URL
// }))

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(helmet({
    crossOriginResourcePolicy: false
}))


app.get("/", (req, res) => {
    return res.json({
        message: "Hello..."
    })
})


connectDB().then(() => {
    app.listen(5000, () => {
        console.log("App is running on port 5000...")
    })
})
