import { Router } from "express";
import { addUserMessage } from "../controllers/messages.controller.js";



export const messagesRouter = Router()

messagesRouter.post('/',addUserMessage)
