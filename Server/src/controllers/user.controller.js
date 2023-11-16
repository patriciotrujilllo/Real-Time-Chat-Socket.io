import { validateUser} from '../validator/user.validator.js'
import jsonwebtoken from 'jsonwebtoken'
import crypto from 'crypto'
import { UserModel } from "../models/user.model.js";
import { hashPassword } from '../utils/auth.js';
import { deletelinkFile, ulrImage } from '../utils/pathOfImg.js';

const Model = new UserModel

export const addUserController = async(req,res)=>{

    const newvalidate = {...req.body,img:req.files.img}
    const validate = validateUser(newvalidate)
    
    if(validate.error){
        return res.status(400).json({ error: JSON.parse(validate.error.message)})
    }

    const {email,password} = validate.data
    const file = req.files.img
    const imgPath = ulrImage(file)

    const forToken = {
        email
    }
    

    const token = jsonwebtoken.sign(forToken,process.env.SIGN_TOKEN)
    const id = crypto.randomUUID()


    try {
        const hashed_password = await hashPassword({password})

        await Model.add({...validate.data,password:hashed_password,id,img:imgPath})

        res.status(200).json({email,token})

    } catch (error) {
        deletelinkFile({path:imgPath})
        return res.status(400).json({message:'error at insert',error})
    }
}