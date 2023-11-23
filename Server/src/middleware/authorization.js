import { decodeToken } from "../utils/jwt.js"

export const userAuthenticated = (req,res, next) =>{
    const  authorization  = req.headers.authorization || req.headers.Authorization
    console.log(authorization)
    if(!authorization?.startsWith('Bearer ')) return res.status(401).json({message: 'Unauthorized'})
    const token = authorization.replace('Bearer ','')
    
    try {
        const dataUser = decodeToken(token)
        const {exp} = dataUser
        const currentTime = new Date().getTime()
        if(exp < currentTime) return res.status(401).json({message:'Unauthorized'})
    } catch (error) {
        return res.status(403).json({response:'Forbidden'})
    }
    next()
}