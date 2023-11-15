import express from 'express'
import logger from 'morgan'
import {config} from 'dotenv'
import { userRouter } from './routes/user.router.js'
import { messagesRouter } from './routes/messages.router.js'

config()

const app = express()
app.use(express.json())
app.use(logger('dev'))

app.use('/user',userRouter)
app.use('/message',messagesRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{console.log(`server running on port: ${PORT}`)})