import { validateMessage} from '../validator/message.validator.js'
import crypto from 'crypto'
import { MessageModel } from "../models/message.model.js";

const Model = new MessageModel

export const addUserMessage = async(req,res)=>{
    
    const validate = validateMessage({...req.body})
    
    if(validate.error){
        return res.status(400).json({ error: JSON.parse(validate.error.message)})
    }

    const id = crypto.randomUUID()
    const {content,emailUser} = validate.data
    const nowDate = new Date()

    try {

        await Model.add({id,content,date:nowDate,emailUser})
        res.status(200).json({message:'add message'})

    } catch (error) {
        return res.status(400).json({message:'error at insert',error})
    }
}
export const getMessages = async(req,res)=>{

    const {email} = req.query

    if(email){
        try {
            const result = await Model.get({email})
            console.log(result[0])
            return res.status(200).json(result[0])
        } catch (error) {
            return res.status(400).json(error)
        }
    }
    
    try {

        const result = await Model.getAll()
        res.status(200).json(result[0])

    } catch (error) {
        return res.status(400).json({message:'error at insert',error})
    }
}