import { validateUser } from '../validator/user.validator.js'
import crypto from 'crypto'
import { UserModel } from "../models/user.model.js";
import { MessageModel } from "../models/message.model.js";
import { hashPassword } from '../utils/auth.js';
import { deletelinkFile, ulrImage } from '../utils/pathOfImg.js';
import { validateUpdateUserPartial } from '../validator/userUpdate.validator.js';
import path from 'path'
import fs from 'fs/promises'

const User = new UserModel
const Messages = new MessageModel

export const addUserController = async(req,res)=>{

    const file = req.files && req.files.img && req.files.img.type ? req.files.img : false
    
    if(file) req.body.img = file
    req.body.roleId = req.body.roleId || '2'

    

    const newvalidate = {...req.body}
    const validate = validateUser(newvalidate)
    
    if(validate.error) return res.status(400).json({ error: JSON.parse(validate.error.message)})
    
    const { password,email } = validate.data

    const duplicate = await User.getByEmail({email})
    if(duplicate[0].length) return res.status(409).json({message: 'Duplicate username'})
    
    console.log(file)


    if(file){
        console.log('paso por dentro del if')
        const imgPath = ulrImage(file)
        validate.data.img = imgPath
    }
    else {
        validate.data.img = 'DefaultImage.png'
    }
    
    const id = crypto.randomUUID()
    console.log(validate.data)


    try {
        const hashed_password = await hashPassword({password})
        await User.add({...validate.data,password:hashed_password,id})
        res.status(200).json({ message:'user add'})
    } catch (error) {
        deletelinkFile({path:validate.data.img})
        return res.status(400).json({message:'error at insert user'})
    }
}
export const updateUserController = async(req,res)=>{
    const {id} = req.body
    // const {id, firstName,lastName,active,email,roleId} = req.body
    if(!id) return res.status(400).json({message: 'id required'})
    delete req.body.id
    const file = req.files?.img ? req.files.img : undefined
    const password = req.body?.password ? req.body.password : undefined
    const newvalidate = {...req.body}

    if(password) newvalidate.password = password
    if(file) newvalidate.img = file

    const validate = validateUpdateUserPartial(newvalidate)
    if(validate.error) return res.status(400).json({ error: JSON.parse(validate.error.message)})
    
    const {email} = validate.data
    newvalidate.active=validate.data.active
    newvalidate.roleId=validate.data.roleId

    const user = await User.getById({id})
    if(!user) return res.status(400).json({message: 'User not found'})

    const duplicate = await User.getByEmail({email})
    if(duplicate && duplicate[0][0]?.id !== id) return res.status(409).json({message: 'Duplicate username'})

    if(file) newvalidate.img = ulrImage(file)
    if(password) newvalidate.password = await hashPassword({password})
    
    try {
        await User.updatebyId({id,data: newvalidate})
        res.status(200).json({ message:'update user'})
    } catch (error) {
        if(file) deletelinkFile({path:imgPath})
        return res.status(400).json({message:'error at update user',error})
    }
}
export const deleteUser = async(req,res)=>{
    const {id} = req
    if(!id) return res.status(400).json({message: 'User id Required'})

    const messages = await Messages.getByIdOfUser({id})
    
    if (messages[0].length) return res.status(400).json({message:'User has assigned messages'})

    const user = await User.getById({id})
    if(!(user[0].length)) return res.status(400).json({message:'User not found'})

    try {
        await User.deletebyId({id})
        return res.status(200).json({message: 'User deleted'})
    } catch (error) {
        res.status(400).json({message: 'error delete user'})
    }
}
export const getAllUsers = async(req,res)=>{
    const { id } = req
    console.log(id)
    try {
        const result = await User.getAll()
        const users = result[0].filter(item=> item.id !== id)
        console.log(users)
        return res.status(200).json(users)
    } catch (error) {
        res.status(400).json({message: 'server error'})
    }
}
export const getUserbyId = async(req,res)=>{
    const {id} = req

    try {
        const result = await User.getById({id})
        return res.status(200).json(result[0][0])
    } catch (error) {
        res.status(400).json({message: 'User not found'})
    }
}

export const imageUser = async(req,res) => {
    const { id } = req
    try {
        const result = await User.getById({id})
        const imageName = result[0][0].img
        const filePath = path.join(process.cwd(), '/src/uploads/users', imageName)
        await fs.access(filePath, fs.constants.F_OK)

        const imageUrl = `http://localhost:4000/uploads/users/${imageName}`
        res.json({ imageUrl })

    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(400).json({message: 'User not found'})
        }
    }
}
