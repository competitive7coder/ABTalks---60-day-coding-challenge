import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

import userModel from "../model/user.model.js"

const generateRefreshToken = async (userId) => {
    const token = await jwt.sign({ id: userId }, process.env.SECRET_KEY_REFRESSH_TOKEN, { expiresIn: '7d' })

    const updateRefreshTokenUser = await userModel.findByIdAndUpdate(userId, {
        refresh_token: token
    })

    return token
}

export default generateRefreshToken