import { validateUser} from '../validator/user.validator.js'
import crypto from 'crypto'
import { UserModel } from "../models/user.model.js";
import { compareHashPassword, hashPassword } from '../utils/auth.js';
import { deletelinkFile, ulrImage } from '../utils/pathOfImg.js';
import { createAccessToken, createRefreshToken } from '../utils/jwt.js';

const User = new UserModel

export const addUserController = async(req,res)=>{

    const newvalidate = {...req.body,img:req.files.img}
    const validate = validateUser(newvalidate)
    
    if(validate.error){
        return res.status(400).json({ error: JSON.parse(validate.error.message)})
    }

    const { password } = validate.data
    const file = req.files.img
    const imgPath = ulrImage(file)
    
    const id = crypto.randomUUID()

    try {
        const hashed_password = await hashPassword({password})

        await User.add({...validate.data,password:hashed_password,id,img:imgPath})
        
        res.status(200).json({ response:'user add'})

    } catch (error) {
        deletelinkFile({path:imgPath})
        return res.status(400).json({message:'error at insert user',error})
    }
}

export const login = async(req,res) =>{
    const {email,password} = req.body

    try {
        const result = await User.getByEmail({email})
        
        if (!(result[0][0].active)) return res.status(400).json({message:'user is not active',error})

        const bool = await compareHashPassword({password,hashed_password:result[0][0].password})
        if(!bool) return res.status(401).json({error: 'Invalid user o password'})
        
        const userReturn = {
            id: result[0][0].id,
            firstName:result[0][0].firstName ,
            lastName:result[0][0].lastName,
            email: result[0][0].email
        }
        
        res.status(200).json({
            token:createAccessToken(userReturn),
            refresh:createRefreshToken(userReturn)
    })

    } catch (error) {
        return res.status(401).json({error: 'Invalid user o password'})
    }
}