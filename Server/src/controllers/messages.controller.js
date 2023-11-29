import { validateMessage,validateMessageUpdate} from '../validator/message.validator.js'
import crypto from 'crypto'
import { MessageModel } from "../models/message.model.js";

const Message = new MessageModel

const _getMessages = async(req,res) =>{
    try {

        const result = await Message.getAll()
        if(!(result.length)) return res.status(400).json({message: 'No notes found'})
        const { io } = req
        io.emit('messages',result[0])
        res.status(200).json(result[0])

    } catch (error) {
        return res.status(400).json({message:'error at get messages',error})
    }
}

export const addUserMessage = async(req,res)=>{
    
    const validate = validateMessage({...req.body})
    
    if(validate.error){
        return res.status(400).json({ error: JSON.parse(validate.error.message)})
    }

    const id = crypto.randomUUID()
    const {content,idUser} = validate.data

    try {

        await Message.add({id,content,idUser})
        
        const { io } = req
        io.emit('message',{
            message: content,
            idUser: idUser
        })
        res.status(200).json({message:'message added'})


    } catch (error) {
        return res.status(400).json({message:'error at insert',error})
    }
}
export const updateMessages = async(req,res)=>{

    const validate = validateMessageUpdate({...req.body})

    if(validate.error){
        return res.status(400).json({ error: JSON.parse(validate.error.message)})
    }

    const {content,idUser,id} = validate.data

    const message = await Message.getById({id})
    if(!message) return res.status(400).json({message: 'Message not found'})

    try {
        await Message.update({id,content,idUser})
        res.status(200).json({ message:'update message'})
    } catch (error) {
        return res.status(400).json({message:'error at update message',error})
    }
}
export const getMessages = async(req,res)=>{

    
    _getMessages(req,res)
}
export const getMessagesWithUser = async(req,res)=>{
yuh
    
    _getMessages(req,res)
}
export const getMessagesById = async(req,res)=>{

    const {id} = req.params

    try {
        const result = await Message.getById({id})
        res.status(200).json(result[0])
    } catch (error) {
        res.status(400).json(error)
    }

}
export const deleteMessage = async(req,res) => {
    
    const {id} = req.body
    if(!id) return res.status(400).json({message: 'Message id Required'})

    const message = await Message.getById({id})
    if(!(message[0].length)) return res.status(400).json({message:'Message not found'})

    try {
        await Message.delete({id})
        return res.status(200).json({message: 'message deleted'})
    } catch (error) {
        res.status(400).json({message: 'error delete message'})
    }
}   