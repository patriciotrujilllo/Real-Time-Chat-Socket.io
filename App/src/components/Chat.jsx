import styled from "styled-components"
import Contacts from "./Contacts"
import Welcome from "./Welcome"
import ChatContainer from "./ChatContainer"
import { useAuth } from "../hooks/useAuth"
import { jwtDecode } from 'jwt-decode'
import useImage from "../hooks/useImage"
import { useState } from "react"
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
	const { auth } = useAuth()
	const { contacts } = useImage()
	const [currentChat,setCurrentChat] = useState(undefined)

	const currentUser = auth?.accessToken ?
		jwtDecode(auth?.accessToken)
		: undefined

	const handleChatChange = (chat) =>{
		setCurrentChat(chat)
	}
	
	return (
		<Container>
			<div className="container">
				{
					currentUser 
                    && contacts 
                    && <Contacts contacts={contacts.data} currentUser={currentUser} changeChat={handleChatChange}/>
				}
				{
					currentChat ? <ChatContainer currentChat={currentChat}/>
						: <Welcome userName={currentUser.firstName}/>
				}
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