import { pool } from './DBConnection.js'

export class MessageModel {

    async addMessage ({id,content,date,emailUser}){
    
        const result = await pool.query('INSERT INTO messages(id,content,date,emailUser) VALUES(?,?,?,?)',[id,content,date,emailUser])
    
        return result
    }

    async showMessagesUser ({email}) {
        const result = await pool.query('SELECT * FROM messages WHERE emailUser=?',[email])
        return result
    }

    async showMessagesAll () {
        const result = await pool.query('SELECT * FROM messages')
        return result
    }
}