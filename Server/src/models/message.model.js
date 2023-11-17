import { pool } from './DBConnection.js'

export class MessageModel {

    async add ({id,content,emailUser}){
    
        const result = await pool.query('INSERT INTO messages(id,content,emailUser) VALUES(?,?,?)',[id,content,emailUser])
    
        return result
    }
    async getByEmail ({email}) {
        const result = await pool.query('SELECT * FROM messages WHERE  emailUser=?',[email])
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
    async delete ({id}) {
        const result = await pool.query('DELETE FROM messages WHERE id=?',[id])
        return result
    }
    async update () {
                
    }
}