import { pool } from './DBConnection.js'

export class MessageModel {

    async add ({id,idEmitor,idReceptor,content,date}){
    
        const result = await pool.query('INSERT INTO messages(id,date,idEmitor,idReceptor,content) VALUES(?,?,?,?,?)',[id,date,idEmitor,idReceptor,content])
    
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
    async getByIdEmisorReceptor ({id,idReceptor}) {
        const result = await pool.query('SELECT * FROM messages WHERE (idEmitor=? AND idReceptor=?) OR (idReceptor=? AND idEmitor=?) ORDER BY date',[id,idReceptor,id,idReceptor])
        return result
    } 
    async getByIdOfUser ({id}) {
        const result = await pool.query('SELECT * FROM messages WHERE idUser=?',[id])
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
    async update ({id,content,idUser}) {
            return await pool.query('UPDATE messages SET content = ?,idUser = ? WHERE id = ?',[content,idUser,id])
    }
}