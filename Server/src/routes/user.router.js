import { Router } from "express";
import { validateUser} from '../validator/user.validator.js'
import jsonwebtoken from 'jsonwebtoken'
import crypto from 'crypto'
import multiparty from 'connect-multiparty'
import bcrypt from 'bcrypt'
import { addUser } from "../models/user.model.js";


const multipartyMiddleware = multiparty({uploadDir: 'src/uploads/users'})
export const userRouter = Router()

userRouter.post('/',multipartyMiddleware,async(req,res)=>{

    const newvalidate = {...req.body,img:req.files.img}
    const validate = validateUser(newvalidate)
    
    if(validate.error){
        return res.status(400).json({ error: JSON.parse(validate.error.message)})
    }

    const {email,password} = validate.data

    const file = req.files.img

    const ulrImage = (file) =>{
        const arrayPath = file.path.split('\\')
        const nameImg = arrayPath.pop()
        const folderImg = arrayPath.pop()
        const pathToSave = `${folderImg}/${nameImg}`
        return pathToSave
    }
    const imgPath = ulrImage(file)

    const forToken = {
        email
    }
    

    const token = jsonwebtoken.sign(forToken,process.env.SIGN_TOKEN)
    const id = crypto.randomUUID()


    try {
        const hashed_password = await bcrypt.hash(password,10)

        await addUser({...validate.data,password:hashed_password,id,img:imgPath})

        res.status(200).json({email,token})

    } catch (error) {
        return res.status(400).json({message:'error at insert',error})
    }
})