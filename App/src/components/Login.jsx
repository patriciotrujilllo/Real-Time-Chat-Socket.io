import { useState} from "react"
import { login } from "../services/user"
import { FormContainer } from "../styled-conponents"
// import { Navigate } from "react-router-dom"

export const Login = () => {

    const [email,setEmail] = useState('')
    const [changePassword,setChangePassword] = useState('')
    const [error,setError] = useState('')
    
    const handleForm = async(e) => {
        e.preventDefault()
        try {
            const data = await login({email,password:changePassword})
            console.log(data)
            
        } catch (err) {
            console.error(err)
            setError(err)
        }
        
    }

    return (
        <>
        <FormContainer>
            <form onSubmit={handleForm}>
                <label htmlFor="email">Email </label>
                <input 
                type="text" 
                id="email"
                autoComplete="off"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                required
                />
    
                <label htmlFor="password">Password:</label>
                <input 
                type="password" 
                id="password"
                onChange={(e)=>setChangePassword(e.target.value)}
                value={changePassword}
                required
                />
                
                <button>Iniciar sesion</button>
            </form>
            {error && error}
        </FormContainer>
        </>
    )
}
