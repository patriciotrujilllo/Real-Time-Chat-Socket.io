import { Router } from "express";
import { login, logout, refresh } from "../controllers/auth.controller.js";



export const authRouter = Router()

authRouter.post('/login',login)
authRouter.get('/refresh',refresh)
authRouter.post('/logout',logout)

