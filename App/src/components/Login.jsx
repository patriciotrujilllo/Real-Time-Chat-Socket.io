import { useState } from "react"
import { login } from "../services/user"
import { useCookies} from 'react-cookie'


export const Login = () => {

    const [changeEmail,setChangeEmail] = useState('')
    const [changePassword,setChangePassword] = useState('')
    const [error,setError] = useState('')
    const [,setCookie] = useCookies('token')
    
    const handleForm = async(e) => {
        e.preventDefault()
        try {
            const data = await login({email:changeEmail,password:changePassword})
            console.log(data)
            setCookie('token',data,{ path: '/App'})
        } catch (err) {
            console.error(err)
            setError(err)
        }
        
    }

    return (
        <div className="container">
            <form onSubmit={handleForm}>
                <label htmlFor="">
                    Email: <input type="text" onChange={(e)=>setChangeEmail(e.target.value)}/>
                </label>
                <label htmlFor="">
                    password: <input type="text" onChange={(e)=>setChangePassword(e.target.value)}/>
                </label>
                <button>Iniciar sesion</button>
            </form>
            {error && error}
        </div>
    )
}