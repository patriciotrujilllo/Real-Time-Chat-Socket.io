import styled from "styled-components"
import Logout from "./Logout"
import ChatInput from "./ChatInput"
import Messages from "./Messages"
import { useEffect, useState } from "react"
import useAxiosRefresh from "../hooks/useAxiosRefresh"


const ChatContainer = ({currentChat,currentUser,socket}) => {

	const [messages,setMessages] = useState([])
	const axios = useAxiosRefresh()
	


	useEffect(()=> {
		(async()=>{
			const response = await axios.post('/message/user',{idReceptor: currentChat.id})
			setMessages(response?.data)
		}
		)()

	},[currentChat])

	useEffect(()=> {
		const listener = (msg) => {
			setMessages(prevState => [...prevState,msg])
		};
		socket.on('msg-receive', listener)
	
		return () => {
			socket.off('msg-receive', listener)
		}
	}, [socket])


	const sendMessage = async(msg) => {
		try {
			const messagetoSend = {
				idEmitor: currentUser.id,
				idReceptor: currentChat.id,
				content: msg
			}
			const result = await axios.post('/message',messagetoSend)
			
			setMessages(prevState => [...prevState,result.data])

		} catch (err) {
			console.error(err)
		}
	}

	return (
		<Container>
			<div className="chat-header">
				<div className="user-details">
					<div className="avatar">
						<img
							src={currentChat.img}
							alt=""
						/>
					</div>
					<div className="username">
						<h3>{currentChat.firstName}</h3>
					</div>
				</div>
				<Logout/>
			</div>
			<Messages messages={messages} currentUser={currentUser}/>
			<ChatInput sendMessage = {sendMessage}/>
		</Container>
	)
}

const Container = styled.div`
	display: grid;
	grid-template-rows: 1fr 8fr 1fr;
	background-color: #3a405a6a;
	.chat-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 2rem;
		background-color: #99B2DD;
		.user-details{
			display:flex;
			align-items: center;
			gap: 1rem;
			.avatar {
				img {
					height: 3rem;
					width: 3rem;
                border-radius: 0.4rem;
				}
			}
			.username {
				h3 {
					color: white;
				}
			}
		}
	}
`

export default ChatContainer