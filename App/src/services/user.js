// import {config} from 'dotenv'
// config()

// eslint-disable-next-line no-undef
const PORT = 'http://localhost:4000'


export const login = async({email,password}) =>{

    try {
        
        const res = await fetch(`${PORT}/user/login`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({email,password})
        })
        if(!res.ok) throw new Error('Error en la respuesta del servidor')
    
        const data = res.json()
        return data

    } catch (error) {
        console.error(`Error al conectar al servidor`,error)
    }
    
}