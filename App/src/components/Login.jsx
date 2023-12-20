import { useState} from "react"
import { loginWithAxios } from "../services/user"
import { FormContainer } from "../styled-conponents"
import { Link,useNavigate,useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import styled from "styled-components"


export const Login = () => {
    
	const [email,setEmail] = useState('')
	const [changePassword,setChangePassword] = useState('')
	const [error,setError] = useState('')

	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || "/chat"
	const {updateAuthLogin} = useAuth()
    
	const handleForm = async(e) => {
		e.preventDefault()
		try {
			const data = await loginWithAxios({email,password:changePassword})
			updateAuthLogin({accessToken: data})
			navigate(from, { replace: true})
            
		} catch (err) {
			console.error(err)
			setError(err)
		}
        
	}

	return (
		<Container>
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
		</Container>
	)
}
const Container = styled.div`

	background-color: #3A405A;
	width: 100%;
	height: 100%;
	display: grid;
	place-items: center;


`