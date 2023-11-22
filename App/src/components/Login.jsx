import { useState} from "react"
import { login } from "../services/user"
// import { Navigate } from "react-router-dom"

export const Login = () => {

    const [changeEmail,setChangeEmail] = useState('')
    const [changePassword,setChangePassword] = useState('')
    const [error,setError] = useState('')
    
    const handleForm = async(e) => {
        e.preventDefault()
        try {
            const data = await login({email:changeEmail,password:changePassword})
            console.log(data)
            
        } catch (err) {
            console.error(err)
            setError(err)
        }
        
    }

    return (
        <div className="container">
            <form onSubmit={handleForm}>
                <label htmlFor="username">Username</label>
                <input 
                type="text" 
                id="username"
                autoComplete="off"
                onChange={(e)=>setChangeEmail(e.target.value)}
                value={changeEmail}
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
        </div>
    )
}