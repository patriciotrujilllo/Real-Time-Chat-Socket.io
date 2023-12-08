// import axios from 'axios'
import { instancePublic } from "./axios"

export const loginWithAxios = async({email,password}) =>{

	try {
        
		const result = await instancePublic.post(`/auth/login`,{email,password},{
			withCredentials: true
		})

		return result.data

	} catch (error) {
		console.error(`Error al conectar al servidor: ${error}`)
	}
    
}
export const register = async(formData) =>{
        
	const response = await instancePublic.post(`/user/register`,formData)
	return response.data
    
    
}