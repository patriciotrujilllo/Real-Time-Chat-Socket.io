import express from 'express'
import logger from 'morgan'
import { config } from 'dotenv'

config()
const app = express()
app.use(logger('dev'))

// app.get('/user',(req,res)=>{
    
// })

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{console.log(`server running on port: ${PORT}`)})