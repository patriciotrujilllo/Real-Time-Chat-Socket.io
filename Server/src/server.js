import express from 'express'
import logger from 'morgan'
import {config} from 'dotenv'
import { pool } from './models/DBConnection.js'
import { validateUser} from './validator/user.validator.js'
import jsonwebtoken from 'jsonwebtoken'
import crypto from 'crypto'
import multiparty from 'connect-multiparty'
import bcrypt from 'bcrypt'

config()

const multipartyMiddleware = multiparty({uploadDir: 'src/uploads/users'})

const app = express()
app.use(logger('dev'))

app.get('/', async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM users WHERE 1=1');
        return res.status(200).json(results);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Error al realizar la consulta' });
    }
})

app.post('/user',multipartyMiddleware,async(req,res)=>{
    // const validate = validateUser(req.body)
    
    // if(validate.error){
    //     return res.status(400).json({ error: JSON.parse(validate.error.message)})
    // }

    // const {firstName,lastName,active,email,img,password,roleId} = validate.data
    const {firstName,lastName,active,email,password,roleId} = req.body

    const file = req.files.img

    const ulrImage = (file) =>{
        const arrayPath = file.path.split('\\')
        const nameImg = arrayPath.pop()
        const folderImg = arrayPath.pop()
        const pathToSave = `${folderImg}/${nameImg}`
        return pathToSave
    }
    const imgPath = ulrImage(file)

    try {
        const isEmailAlreadyCreate = await pool.query('SELECT email FROM users WHERE email= ?',[email])

        // if(isEmailAlreadyCreate.rows.length>0){
        //     const error = new Error('user already registered')
        //     return res.status(400).json(error)
        // }
    } catch (error) {
        return res.status(400).json({message:'ocurrio un error',error})
    }
    
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

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{console.log(`server running on port: ${PORT}`)})