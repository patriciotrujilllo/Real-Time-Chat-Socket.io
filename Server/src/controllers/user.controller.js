import { validateUser } from '../validator/user.validator.js'
import crypto from 'crypto'
import { UserModel } from "../models/user.model.js";
import { hashPassword } from '../utils/auth.js';
import { deletelinkFile, ulrImage } from '../utils/pathOfImg.js';
import { validateUpdateUserPartial } from '../validator/userUpdate.validator.js';



const User = new UserModel

export const addUserController = async(req,res)=>{

    const file = req.files.img
    const newvalidate = {...req.body,img:file}
    const validate = validateUser(newvalidate)
    
    if(validate.error) return res.status(400).json({ error: JSON.parse(validate.error.message)})
    
    const { password,email } = validate.data

    const duplicate = await User.getByEmail({email})
    if(duplicate) return res.status(409).json({message: 'Duplicate username'})
        
    const imgPath = ulrImage(file)
    const id = crypto.randomUUID()

    try {
        const hashed_password = await hashPassword({password})
        await User.add({...validate.data,password:hashed_password,id,img:imgPath})
        res.status(200).json({ message:'user add'})
    } catch (error) {
        deletelinkFile({path:imgPath})
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
    
    // const columns = Object.keys(newvalidate).map(col => `${col} = ?`).join(', ');
    //             const values = Object.values(newvalidate);
    //             const sql = `UPDATE usuarios SET ${columns} WHERE id = ?`;
    //             values.push(id);
    //             console.log(sql,values)
    
    try {
        await User.updatebyId({id,data: newvalidate})
        res.status(200).json({ message:'update user'})
    } catch (error) {
        if(file) deletelinkFile({path:imgPath})
        return res.status(400).json({message:'error at update user',error})
    }
}
export const deleteUserController = async(req,res)=>{
}
export const seachUsersController = async(req,res)=>{
}
export const seachUserbyIdController = async(req,res)=>{
}
export const seachUserbyEmailController = async(req,res)=>{
}