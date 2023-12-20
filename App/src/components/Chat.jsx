import styled from "styled-components"
import Contacts from "./Contacts"
import Welcome from "./Welcome"
import ChatContainer from "./ChatContainer"
import { useAuth } from "../hooks/useAuth"
import { jwtDecode } from 'jwt-decode'
import useImage from "../hooks/useImage"
import { useState,useEffect } from "react"
import { io } from 'socket.io-client'
// import { useNavigate,useLocation } from "react-router-dom"

const Chat = () => {
	const { auth } = useAuth()
	const { contacts } = useImage()
	const [currentChat,setCurrentChat] = useState(undefined)

	const currentUser = auth?.accessToken ?
		jwtDecode(auth?.accessToken)
		: undefined

	const handleChatChange = (chat) =>{
		setCurrentChat(chat)
	}

	const socket = io('http://localhost:4000',{
		query:{ ...auth }
	})

	useEffect(() => {
		socket.on('connect', () => {
			console.log('Conectado al servidor');
		})

		return () => {
			socket.disconnect();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	return (
		<Container>
			<div className="container">
				{
					currentUser 
                    && contacts 
                    && <Contacts contacts={contacts.data} currentUser={currentUser} changeChat={handleChatChange}/>
				}
				{
					currentChat ? <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
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
    background-color: #3A405A;
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