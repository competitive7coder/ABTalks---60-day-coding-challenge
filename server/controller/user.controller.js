import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

import userModel from '../model/user.model.js'
import generatedAccessToken from "../util/generatedAccessToken.js"
import generateRefreshToken from "../util/generateRefreshToken.js"


export const userRegisterController = async (request, response) => {
    try {

        const { name, email, password } = request.body || {}

        if (!name || !email || !password) {
            return response.status(400).json({
                message: 'Please provide name , email and password',
                error: true,
                success: false
            })
        }

        const user = await userModel.findOne({ email: email })

        if (user) {
            return response.status(400).json({
                message: `User already registered with your provided email`,
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const payload = {
            name,
            email,
            password: hashPassword
        }

        const newUser = new userModel(payload)
        const save = await newUser.save()

        return response.json({
            message: 'user register successfully',
            error: false,
            success: true
        })

    } catch (error) {

        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })

    }
}

export const userLoginController = async (request, response) => {
    try {
        const { email, password } = request.body || {}

        if (!email || !password) {
            return response.status(400).json({
                message: 'Please provide email and password',
                error: true,
                success: false
            })
        }

        const user = await userModel.findOne({ email: email })

        if (!user) {
            return response.status(400).json({
                message: `Provide email not registered`,
                error: true,
                success: false
            })
        }

        const checkPassword = await bcryptjs.compare(password, user.password)

        if (!checkPassword) {
            return response.status(400).json({
                message: "Please enter right password",
                error: true,
                success: false
            })
        }

        // --- PRODUCTION LOGIC: SUPER ADMIN OVERRIDE ---
        // Big companies bootstrap their first admins using environment variables.
        // If the logging-in user is listed in SUPER_ADMIN_EMAILS, enforce admin status.
        const superAdmins = process.env.SUPER_ADMIN_EMAILS ? process.env.SUPER_ADMIN_EMAILS.split(',') : [];
        if (superAdmins.includes(user.email) && user.role !== 'admin') {
            user.role = 'admin';
            await user.save();
            console.log(`[SECURITY] Bootstrapped Super Admin privileges for ${user.email}`);
        }
        // ----------------------------------------------

        const accessToken = await generatedAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        response.cookie('accesstoken', accessToken, cookiesOption);
        response.cookie('refreshToken', refreshToken, cookiesOption);


        return response.json({
            message: "Login succesfully",
            error: false,
            success: true,
            data: {
                accessToken,
                role: user.role  // 'user' or 'admin' — used by frontend to redirect
            }
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const userLogOutController = async (request, response) => {
    try {

        const userId = request.userId

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }

        response.clearCookie('accesstoken', cookiesOption)
        response.clearCookie('refreshToken', cookiesOption)

        const removeRefresh = await userModel.findByIdAndUpdate(userId, {
            refresh_token: ""
        })

        return response.json({
            message: 'Logout successfully',
            error: false,
            success: true
        })


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const userRefressingTokenController = async (request, response) => {
    try {
        const tokenFromcookie = request?.cookies?.refreshToken
        const tokenFromHeader = request?.headers?.authorization?.split(" ")[1]

        const refreshToken = tokenFromcookie || tokenFromHeader

        if (!refreshToken) {
            return response.status(401).json({
                message: "Invalid token",
                error: true,
                success: false
            })
        }

        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESSH_TOKEN)

        if (!verifyToken) {
            return response.status(401).json({
                message: "token is expired",
                error: true,
                success: false
            })
        }

        const userId = verifyToken?.id

        const newAccessToken = await generatedAccessToken(userId)

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        response.cookie('accesstoken', newAccessToken, cookiesOption)

        return response.json({
            message: "New Access token generated",
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken
            }
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getCurrentUserController = async (request, response) => {
    try {
        const userId = request.userId
        const user = await userModel.findById(userId).select('-password -refresh_token')
        if (!user) {
            return response.status(404).json({
                message: "User not found",
                error: true,
                success: false
            })
        }
        return response.json({
            message: "User fetched successfully",
            error: false,
            success: true,
            data: user
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getLeaderboardController = async (request, response) => {
    try {
        const users = await userModel.find().select('name current_streak longest_streak').sort({ current_streak: -1 }).limit(10)
        return response.json({
            message: "Leaderboard fetched successfully",
            error: false,
            success: true,
            data: users
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}