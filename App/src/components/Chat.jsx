import styled from "styled-components";
import { useEffect,useState } from "react"
import useAxiosRefresh from "../hooks/useAxiosRefresh"
import Contacts from "./Contacts";
import { useAuth } from "../hooks/useAuth";
import { jwtDecode } from 'jwt-decode'
// import { useNavigate,useLocation } from "react-router-dom"
// import useLogout from "../hooks/useLogout"


//     return (
//         <>
//         <h1>Ha iniciado sesion y esta es la pagina de los mensajes</h1>
//         <h2>Mensajes</h2>
//         {/* {
//             messages ? messages.map(message=> <h3 key={message.id}>{message.content}</h3>) : <h3>No hay mensajes</h3>
//         } */}
//         <button onClick={logout}>Logout</button>
//         </>
//     )
// }

const Chat = () => {

	// const logout = useLogout()
	// const navigate = useNavigate()
	// const location = useLocation()
	const axios = useAxiosRefresh()
	const { auth } = useAuth()
	const [contacts,setContacts] = useState({})
	const decoded = auth?.accessToken ?
		jwtDecode(auth?.accessToken)
		: undefined
	const email = decoded?.email

	useEffect(()=> {

		(async() => {
			try{
				const result = await axios.get('/user')
				setContacts(result?.data)
				console.log(result?.data)
			}catch(err) {
				console.error(err)
				// navigate('/login', { state: { from: location}, replace: true})
			}
		})()

	},[])

	return (
		<Container>
			<div className="container">
				<Contacts contacts={contacts} user={email}/>
			</div>
		</Container>
	)
}

export default Chat

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .container{
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 1fr 3fr;
        @media screen and (min-width: 720px) and (max-width: 1080px){
            grid-template-columns: 1.5fr 2.5fr
        }
    }


`