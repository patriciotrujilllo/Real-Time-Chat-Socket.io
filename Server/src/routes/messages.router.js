import { Router } from "express";
import { addUserMessage,getMessages } from "../controllers/messages.controller.js";



export const messagesRouter = Router()

messagesRouter.post('/',addUserMessage)
messagesRouter.get('/',getMessages)
