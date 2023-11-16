import express from 'express'
import logger from 'morgan'
import {config} from 'dotenv'
import { userRouter } from './routes/user.router.js'
import { messagesRouter } from './routes/messages.router.js'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { corsConfiguration } from './utils/corsConfiguration.js'

config()

const app = express()
app.use(express.json())
app.use(express.static('/Server/src/uploads'))
app.use(logger('dev'))
app.use(cors(corsConfiguration()))

const server = createServer(app)
const io = new Server(server,{
    cors: corsConfiguration
})

io.on('connection',(socket)=>{
    console.log('user connected')

    socket.on('disconnect', () =>{
        console.log('user disconnected')
    })
}) 

app.use('/user',userRouter)
app.use('/message',messagesRouter)

const PORT = process.env.PORT || 3000

server.listen(PORT,()=>{console.log(`server running on port: ${PORT}`)})