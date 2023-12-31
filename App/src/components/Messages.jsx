import { useEffect, useRef } from "react"
import styled from "styled-components"

const Messages = ({messages,currentUser}) => {
	const scroll = useRef()

	useEffect(()=> {
		scroll.current?.scrollIntoView({ behaviour : " smooth"})
	},[messages])
	return (
		<Container>
			{
				messages ? messages.map(message=> {
					return (
						<div ref={scroll} key={message.id} className={`message ${currentUser.id===message.idEmitor ? 'emisor':'receptor'}`}>
							<div className="content">
								<p>{message.content}</p>
							</div>
							
						</div>
						
					)
				}): <h1>No hay mensajes</h1>
			} 
		</Container>
	)
}

const Container = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
padding: 1rem 2rem;
overflow: auto;
height: 64vh;
.message {
	display:flex;
	align-items:center;
	max-height: 20%;
	.content {
		max-width:50%;
		/* overflow-wrap: break-word; */
		padding: 1rem;
		font-size: 1rem;
		border-radius: 1rem;
		color: #e4e0e0;
	}
}
.emisor {
	justify-content: flex-end;
	.content {
		background-color:#6a85b3
	}
}
.receptor {
	justify-content: flex-start;
	.content{
		background-color:#5D6A81
	}
}
`

export default Messages