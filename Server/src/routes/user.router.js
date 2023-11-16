import { Router } from "express";
import multiparty from 'connect-multiparty'
import { addUserController,login } from "../controllers/user.controller.js";


const multipartyMiddleware = multiparty({uploadDir: 'src/uploads/users'})
export const userRouter = Router()

userRouter.post('/',multipartyMiddleware,addUserController)
userRouter.post('/login', login)