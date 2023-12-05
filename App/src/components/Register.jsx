import { useState} from "react"
import { register } from "../services/user"
import { Link } from "react-router-dom"
import { FormContainer } from "../styled-conponents"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = () => {

    const [fisrtName,setFisrtname] = useState('')
    const [lastName,setLastname] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmpassword,setConfirmpassword] = useState('')
    const [imagen,setImagen] =useState()
    const [error,setError] = useState('')
    
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
            formData.append('firstName',fisrtName)
            formData.append('lastName',lastName)
            formData.append('email',email)
            formData.append('password',password)
            formData.append('confirmpassword',confirmpassword)
            formData.append('img',imagen)
            try {
                await register(formData)
                
            } catch (err) {
                setError(err)
            }
        }
        
        
    }

    return (
        <>
        <FormContainer>
            <form onSubmit={handleForm}>
                <label htmlFor="firstname">Firstname </label>
                <input 
                type="text" 
                id="firstname"
                autoComplete="off"
                onChange={(e)=>setFisrtname(e.target.value)}
                value={fisrtName}
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
                required
                />
                <button>Registrarme</button>
                <span> ¿ya tienes una cuenta? <Link to="/login">Login</Link></span>
            </form>
            {error && error}
        </FormContainer>
        <ToastContainer />
        </>
    )
}