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
import { decodeToken } from './utils/jwt.js'


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


let onlineUsers = new Map()

// Autenticación de middleware
io.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.accessToken){
        const decode = decodeToken(socket.handshake.query.accessToken)
        if(!decode) return next(new Error('Authentication error'))
        socket.decoded = decode
        next()

    }
    else {
        next(new Error('Authentication error'));
    }    
    })
    .on('connection', (socket) => {
        console.log('user connected')
        // Añadir usuario a la lista de usuarios en línea
        onlineUsers.set(socket.decoded.id, socket.id)
        console.log(onlineUsers)

        socket.on('disconnect', () => {
            console.log('user disconnected')
            // Eliminar usuario de la lista de usuarios en línea
            onlineUsers.delete(socket.decoded.id)
            console.log(onlineUsers)
        })
})

app.use('/message',(req,res,next) => {
    req.emitToSocket = (eventName, eventData) => {
        const socketId = onlineUsers.get(req.body.idReceptor)
        if (socketId) {
            io.to(socketId).emit(eventName, eventData)
        }
    }

    next()
},messagesRouter)

app.use('/auth',authRouter)
app.use('/user',userRouter)

app.use('*',errorHandler)

const PORT = process.env.PORT || 3000

server.listen(PORT,()=>{console.log(`server running on port: ${PORT}`)})