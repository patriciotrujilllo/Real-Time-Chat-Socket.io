import { Router } from "express";
import { addUserMessage,getMessages,getMessagesById,deleteMessage } from "../controllers/messages.controller.js";
import { userAuthenticated } from "../middleware/autorization.js";



export const messagesRouter = Router()

messagesRouter.post('/',userAuthenticated,addUserMessage)
messagesRouter.get('/:id',userAuthenticated,getMessagesById)
messagesRouter.get('/',userAuthenticated,getMessages)
messagesRouter.delete('/:id',userAuthenticated,deleteMessage)
