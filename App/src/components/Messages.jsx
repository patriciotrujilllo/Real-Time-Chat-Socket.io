import { useEffect } from "react"
import useAxiosRefresh from "../hooks/useAxiosRefresh"
import { useNavigate,useLocation } from "react-router-dom"
import useLogout from "../hooks/useLogout"

export const Messages = () => {
    const logout = useLogout()
    const axios = useAxiosRefresh()
    const navigate = useNavigate()
    const location = useLocation()
    // const [messages,setMessages] = useState([])

    useEffect(()=> {

        (async() => {
            try{
                const result = await axios.get('/message')
                console.log(result?.data)
            }catch(err) {
                console.error(err)
                navigate('/login', { state: { from: location}, replace: true})
            }
            
            // setMessages(result?.data)
        })()

    },[])

    return (
        <>
        <h1>Ha iniciado sesion y esta es la pagina de los mensajes</h1>
        <h2>Mensajes</h2>
        {/* {
            messages ? messages.map(message=> <h3 key={message.id}>{message.content}</h3>) : <h3>No hay mensajes</h3>
        } */}
        <button onClick={logout}>Logout</button>
        </>
    )
}