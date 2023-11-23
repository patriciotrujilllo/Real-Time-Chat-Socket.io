import { createAccessToken, createRefreshToken, decodeTokenRefresh } from '../utils/jwt.js';
import { compareHashPassword } from '../utils/auth.js';
import { UserModel } from "../models/user.model.js";

const User = new UserModel

export const login = async(req,res) =>{
    const {email,password} = req.body

    if(!email || !password) return res.status(400).json({message: 'Email or Password required'})

    try {
        const result = await User.getByEmail({email})
        
        if (result.length===0 ||!(result[0][0].active)) return res.status(400).json({message:'Unauthorized'})

        const bool = await compareHashPassword({password,hashed_password:result[0][0].password})
        if(!bool) return res.status(401).json({message: 'Unauthorized'})
        
        const userReturn = {
            firstName:result[0][0].firstName ,
            email: result[0][0].email,
            roleId: result[0][0].roleId
        }

        res.cookie('refreshToken',createRefreshToken(userReturn), {httpOnly: true,sameSite:'None',maxAge: 15*60*1000})
        
        res.status(200).json({accessToken:createAccessToken(userReturn)})

    } catch (error) {
        return res.status(401).json({error: 'Invalid user o password'})
    }
}

export const refresh = async(req,res) => {
    const cookies = req.cookies

    if(!cookies?.refreshToken) return res.status(401).json({ message : 'Unauthorized'})

    const refreshToken = cookies.refreshToken

    let token
    try {
        token = decodeTokenRefresh(refreshToken)
    } catch (error) {
        return res.status(403).json({message: 'Forbidden'})
    }
    let result
    try {
        result = await User.getByEmail({email: token.email}) 
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized'})
    }
    

    const userReturn = {
        firstName:result[0][0].firstName ,
        email: result[0][0].email,
        roleId: result[0][0].roleId
    }

    res.json({accessToken:createAccessToken(userReturn)})

}

export const logout = (req, res) => {
    const cookies = req.cookies
    if(!cookies?.refreshToken) return res.status(204)
    res.clearCookie('refreshToken',{httpOnly: true,sameSite:'None'})
    res.json({message: 'cookie cleared'})
}