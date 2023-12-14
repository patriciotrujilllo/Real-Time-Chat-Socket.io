import styled from "styled-components"
import { EmojiIcon, SendIcons } from "./Icons"
import EmojiPicker from 'emoji-picker-react'
import { useRef, useState } from "react"

const ChatInput = ({sendMessage}) => {
	const [showEmojiPiecker,setShowEmojiPiecker] = useState(false)
	const [msg,setMsg] = useState('')
	const inputRef = useRef()

	const handleSubmit = async(e) => {
		e.preventDefault()
		sendMessage(msg)
		setMsg('')
	}
    
	const handleEmoji = (e) => {
		const message = inputRef.current.value + e.emoji
		setMsg(message)
	}

	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<div className="emoji" onClick ={()=> setShowEmojiPiecker(!showEmojiPiecker)}>
					<EmojiIcon />
				</div>
				
				{ showEmojiPiecker && <EmojiPicker onEmojiClick={handleEmoji}/>}
				<input 
					ref={inputRef}
					type="text" 
					onChange={(e)=>setMsg(e.target.value)
					}

					value={msg}
                
				/>
				<button>
					<SendIcons />
				</button>
			</form> 
		</Container>
	)
}

const Container = styled.div`
display: flex;
justify-content: center;
width:100%;
form {
    display: grid;
    align-items: center;
    justify-content: space-around;
    grid-template-columns: 5% 85% 5%;
    width:100%;
    height: 100%;
    background-color: #080420;
    .emoji {
        
        cursor: pointer;
    }
    input {
        height: 60%;
        border-radius: 2rem;
        font-size: 1.2rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .EmojiPickerReact {
        width: 100px;
        height: 100px;
        position: absolute;
        top: 360px;
    }
    .emoji {
        display: flex;
        justify-content: center;
    }
    button {
        width:100%;
        height: 60%;
        svg {
            width: 100%;
            height: 60%;
        }
    }
    svg {
        width: 80%;
        height: 60%;
    }
}
`

export default ChatInput