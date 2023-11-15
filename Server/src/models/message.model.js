import { pool } from './DBConnection.js'

export const addMessage = async({id,content,date,emailUser}) =>{
    
    const result = await pool.query('INSERT INTO messages(id,content,date,emailUser) VALUES(?,?,?,?)',[id,content,date,emailUser])

    return result

}
export const showMessagesUser = async({user}) =>{
    const result = await pool.query('SELECT * FROM messages WHERE emailUser=?',[user])
    return result
}
export const showMessagesAll = async() =>{
    const result = await pool.query('SELECT * FROM messages')
    return result
}