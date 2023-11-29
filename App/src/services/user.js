import axios from 'axios'

const PORT = 'http://localhost:4000'


export const login = async({email,password}) =>{

    try {
        
        const res = await fetch(`${PORT}/auth/login`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({email,password})
        })
        if(!res.ok) throw new Error(`HTTP error: ${res.status}`)
    
        const data = res.json()
        return data

    } catch (error) {
        console.error(`Error al conectar al servidor: ${error}`)
    }
    
}

export const loginWithAxios = async({email,password}) =>{

    try {
        
        const data = await axios.post(`${PORT}/auth/login`,{email,password},{
            headers:{
                'Content-Type':'application/json',
            }
        })

        return data

    } catch (error) {
        console.error(`Error al conectar al servidor: ${error}`)
    }
    
}
export const register = async(formData) =>{
        
        const response = await axios.post(`${PORT}/user/register`,formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    
    
}