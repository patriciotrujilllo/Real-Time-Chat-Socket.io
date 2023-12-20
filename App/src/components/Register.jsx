import { useState} from "react"
import { register } from "../services/user"
import { Link,useNavigate } from "react-router-dom"
import { FormContainer } from "../styled-conponents"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";

export const Register = () => {

	const [firstName,setFirstname] = useState('')
	const [lastName,setLastname] = useState('')
	const [email,setEmail] = useState('')
	const [password,setPassword] = useState('')
	const [confirmpassword,setConfirmpassword] = useState('')
	const [imagen,setImagen] =useState(undefined)
	const [error,setError] = useState('')
	const navigate = useNavigate()
    
	const handleForm = async(e) => {
		e.preventDefault()

		if(password!==confirmpassword){
			toast.error("password and confirm password should be same",{
				position: "bottom-right",
				autoClose: 5000,
				pauseOnHover: true,
				theme:"dark"
			})
		}
		else{
			const formData = new FormData()
			formData.append('firstName',firstName)
			formData.append('lastName',lastName)
			formData.append('email',email)
			formData.append('password',password)
			formData.append('confirmpassword',confirmpassword)
			if(imagen) {
				formData.append('img', imagen);
			}
			try {
				await register(formData)
				navigate('/login')
                
			} catch (err) {
				setError(err)
			}
		}
        
        
	}

	return (
		<Container>
			<FormContainer>
				<form onSubmit={handleForm}>
					<label htmlFor="firstname">Firstname </label>
					<input 
						type="text" 
						id="firstname"
						autoComplete="off"
						onChange={(e)=>setFirstname(e.target.value)}
						value={firstName}
						required
					/>

					<label htmlFor="lastname">Lastname </label>
					<input 
						type="text" 
						id="lastname"
						autoComplete="off"
						onChange={(e)=>setLastname(e.target.value)}
						value={lastName}
						required
					/>

					<label htmlFor="email">Email </label>
					<input 
						type="email" 
						id="email"
						autoComplete="off"
						onChange={(e)=>setEmail(e.target.value)}
						value={email}
						required
					/>
    
					<label htmlFor="password">Password </label>
					<input 
						type="password" 
						id="password"
						onChange={(e)=>setPassword(e.target.value)}
						value={password}
						required
					/>

					<label htmlFor="confirmpassword">Confirm password </label>
					<input 
						type="password" 
						id="confirmpassword"
						onChange={(e)=>setConfirmpassword(e.target.value)}
						value={confirmpassword}
						required

					/>

					<label htmlFor="Imagen">Imagen </label>
					<input 
						type="file" 
						id="Imagen"
						onChange={(e)=>setImagen(e.target.files[0])}
					/>
					<button>Registrarme</button>
					<span> ¿ya tienes una cuenta? <Link to="/login">Login</Link></span>
				</form>
				{error && JSON.stringify(error)}
			</FormContainer>
			<ToastContainer />
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