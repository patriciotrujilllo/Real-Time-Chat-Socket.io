import { validateMessage} from '../validator/message.validator.js'
import crypto from 'crypto'
import { addMessage,showMessagesAll,showMessagesUser } from "../models/message.model.js";

export const addUserMessage = async(req,res)=>{
    
    const validate = validateMessage({...req.body})
    
    if(validate.error){
        return res.status(400).json({ error: JSON.parse(validate.error.message)})
    }

    const id = crypto.randomUUID()
    const {content,emailUser} = validate.data
    const nowDate = new Date()

    try {

        const result = await addMessage({id,content,date:nowDate,emailUser})

        res.status(200).json(result)

    } catch (error) {
        return res.status(400).json({message:'error at insert',error})
    }
}