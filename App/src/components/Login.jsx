import { useState} from "react"
import { loginWithAxios } from "../services/user"
import { FormContainer } from "../styled-conponents"
import { Link,useNavigate,useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"


export const Login = () => {
    
    const [email,setEmail] = useState('')
    const [changePassword,setChangePassword] = useState('')
    const [error,setError] = useState('')

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/messages"
    const {updateAuthLogin} = useAuth()
    
    const handleForm = async(e) => {
        e.preventDefault()
        try {
            const data = await loginWithAxios({email,password:changePassword})
            const auth = {accessToken: data.accessToken, user:email , role: data.role}
            updateAuthLogin(auth)
            navigate(from, { replace: true})
            
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
                <span> ¿No tienes una cuenta? <Link to="/">Registrame</Link></span>
            </form>
            {error && error}
        </FormContainer>
        </>
    )
}
