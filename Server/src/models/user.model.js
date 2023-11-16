import { pool } from './DBConnection.js'

export class UserModel {
        async add ({id,firstName,lastName,active,email,password,roleId,img}) {

                await pool.query('INSERT INTO users(id, firstName, lastName, active, email, password, img, roleId) VALUES(?,?,?,?,?,?,?,?)',[id,firstName,lastName,Number(active),email,password,img,roleId])
        
        }
        async getByEmail ({email}) {
                const result = await pool.query('SELECT * FROM users WHERE emailUser=?',[email])
                return result
        }    
        async getById ({id}) {
                const result = await pool.query('SELECT * FROM users WHERE id=?',[id])
                return result
        }   
        async getAll () {
                const result = await pool.query('SELECT * FROM users')
                return result
        }
        async update () {
                
        }
        async delete ({email}) {
        const result = await pool.query('DELETE * FROM users WHERE emalUser=?',[email])

        return result
        }
}
