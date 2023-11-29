import { Router } from "express";
import { addUserMessage,getMessages,getMessagesById,deleteMessage,updateMessages } from "../controllers/messages.controller.js";
import { userAuthenticated } from "../middleware/authorization.js";



export const messagesRouter = Router()
messagesRouter.use(userAuthenticated)

messagesRouter.post('/',addUserMessage)
messagesRouter.get('/:id',getMessagesById)
messagesRouter.get('/',getMessages)
messagesRouter.delete('/',deleteMessage)
messagesRouter.put('/',updateMessages)
