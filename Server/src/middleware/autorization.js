import { decodeToken } from "../utils/jwt.js"

export const userAuthenticated = (req,res, next) =>{
    const { authorization } = req.headers
    if(!authorization) return res.status(400).json({response: 'token required'})
    const token = authorization.replace('Bearer ','')
    
    try {
        const dataUser = decodeToken(token)
        const {exp} = dataUser
        const currentTime = new Date().getTime()
        if(exp < currentTime) return res.status(400).json({response:'expired token'})
    } catch (error) {
        res.status(400).json({response:'invalid token'})
    }
    next()
}