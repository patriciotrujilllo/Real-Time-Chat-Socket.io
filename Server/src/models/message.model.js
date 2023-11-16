import { pool } from './DBConnection.js'

export class MessageModel {

    async add ({id,content,date,emailUser}){
    
        const result = await pool.query('INSERT INTO messages(id,content,date,emailUser) VALUES(?,?,?,?)',[id,content,date,emailUser])
    
        return result
    }
    async getByEmail ({email}) {
        const result = await pool.query('SELECT * FROM messages WHERE user=?',[email])
        return result
    }
    async getById ({id}) {
        const result = await pool.query('SELECT * FROM messages WHERE id=?',[id])
        return result
    } 
    async getAll () {
        const result = await pool.query('SELECT * FROM messages')
        return result
    }
    async delete ({email}) {
        const result = await pool.query('DELETE * FROM users WHERE email=?',[email])
        return result
    }
    async update () {
                
    }
}