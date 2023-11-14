import { createPool } from 'mysql2/promise'
import {config} from 'dotenv'

config()

export const pool = createPool({
    host:'localhost',
    user:'root',
    database:'chat',
    password:'Letales123@mysql',
    port: 3306
})