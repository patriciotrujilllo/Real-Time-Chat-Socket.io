import { Router } from "express";
import { pool } from '../models/DBConnection.js'
import { validateUser} from '../validator/user.validator.js'
import jsonwebtoken from 'jsonwebtoken'
import crypto from 'crypto'
import multiparty from 'connect-multiparty'
import bcrypt from 'bcrypt'


const multipartyMiddleware = multiparty({uploadDir: 'src/uploads/users'})
export const userRouter = Router()

userRouter.post('/',multipartyMiddleware,async(req,res)=>{

    const newvalidate = {...req.body,img:req.files.img}
    const validate = validateUser(newvalidate)
    
    if(validate.error){
        return res.status(400).json({ error: JSON.parse(validate.error.message)})
    }

    const {firstName,lastName,active,email,password,roleId} = validate.data
    // const {firstName,lastName,active,email,password,roleId} = req.body

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

        await pool.query('INSERT INTO users(id, firstName, lastName, active, email, password, img, roleId) VALUES(?,?,?,?,?,?,?,?)',[id,firstName,lastName,Number(active),email,hashed_password,imgPath,roleId])

        res.status(200).json({email,token})

    } catch (error) {
        return res.status(400).json({message:'error at insert',error})
    }
})