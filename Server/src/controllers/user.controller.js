import { validateUser} from '../validator/user.validator.js'
import crypto from 'crypto'
import { UserModel } from "../models/user.model.js";
import { hashPassword } from '../utils/auth.js';
import { deletelinkFile, ulrImage } from '../utils/pathOfImg.js';



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
