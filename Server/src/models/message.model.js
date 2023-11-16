import { pool } from './DBConnection.js'

export class MessageModel {

    async add ({id,content,date,emailUser}){
    
        const result = await pool.query('INSERT INTO messages(id,content,date,emailUser) VALUES(?,?,?,?)',[id,content,date,emailUser])
    
        return result
    }

    async get ({email}) {
        const result = await pool.query('SELECT * FROM messages WHERE emailUser=?',[email])
        return result
    }

    async getAll () {
        const result = await pool.query('SELECT * FROM messages')
        return result
    }
    // async update ({id,content,date,emailUser}) {
    //     const result = await pool.query('SELECT * FROM messages')
    //     return result
    // }
    // async delete () {
            
    // }
}