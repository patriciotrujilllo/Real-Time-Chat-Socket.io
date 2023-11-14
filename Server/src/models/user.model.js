import { pool } from './DBConnection.js'

export const addUser = async({id,firstName,lastName,active,email,password,roleId,img}) =>{
    
        await pool.query('INSERT INTO users(id, firstName, lastName, active, email, password, img, roleId) VALUES(?,?,?,?,?,?,?,?)',[id,firstName,lastName,Number(active),email,password,img,roleId])

}