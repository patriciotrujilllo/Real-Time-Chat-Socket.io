import { Router } from "express";
import multiparty from 'connect-multiparty'
import { addUserController } from "../controllers/user.controller.js";
import { userAuthenticated } from "../middleware/authorization.js";


const multipartyMiddleware = multiparty({uploadDir: 'src/uploads/users'})
export const userRouter = Router()
userRouter.use(userAuthenticated)

userRouter.post('/',multipartyMiddleware,addUserController)