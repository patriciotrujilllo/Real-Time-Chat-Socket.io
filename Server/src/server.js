import express from 'express'
import logger from 'morgan'
import {config} from 'dotenv'
import { userRouter } from './routes/user.router.js'
import { messagesRouter } from './routes/messages.router.js'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { corsConfiguration } from './utils/corsConfiguration.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { authRouter } from './routes/auth.router.js'
import { errorHandler } from './middleware/errorHandler.js'
import path from 'path'
import { userAuthenticated } from './middleware/authorization.js'


config()

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use('/uploads/users', express.static(path.join(process.cwd(), 'src/uploads/users')))
app.use(logger('dev'))
app.use(cors(corsConfiguration()))

const server = createServer(app)
const io = new Server(server,{
    cors: corsConfiguration()
})

app.use((req,res,next) => {
    req.io = io
    next()
})

io.on('connection',(socket)=>{
    console.log('user connected')

    socket.on('disconnect', () =>{
        console.log('user disconnected')
    })
}) 

app.use('/auth',authRouter)
app.use('/user',userRouter)
app.use('/message',messagesRouter)

app.use('*',errorHandler)

const PORT = process.env.PORT || 3000

server.listen(PORT,()=>{console.log(`server running on port: ${PORT}`)})