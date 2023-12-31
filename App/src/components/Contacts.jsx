import { useEffect, useState } from "react"
import styled from 'styled-components'
// import useImage from "../hooks/useImage"



export default function Contacts({ contacts, currentUser, changeChat  }) {
	const [currentUserName, setCurrentUserName] = useState(undefined)
	const [currentUserImage, setCurrentUserImage] = useState(undefined)
	const [currentSelected, setCurrentSelected] = useState(undefined)

	useEffect( () => {
		
		if(currentUser){
			setCurrentUserName(currentUser.firstName)
			setCurrentUserImage(currentUser.url)
		}
	
	}, [currentUser])

	const changeCurrentChat = (index, contact) => {
		setCurrentSelected(index)
		changeChat(contact)
	}

	return (
		<>
			{currentUserImage && currentUserName && (
				<Container>
					<div className="contacts">
						{contacts.map((contact, index) => {
							return (
								<div key={contact.id} 
									className={`contact ${ index === currentSelected ? "selected" : ""}`}
									onClick={() => changeCurrentChat(index, contact)}
								>
									<div className="avatar">
										<img
											src={`${contact.img}`}
											alt=""
										/>
									</div>
									<div className="username">
										<h3>{contact.firstName}</h3>
									</div>
								</div>
							);
						})}
					</div>
					<div className="current-user">
						<div className="avatar">
							<img
								src={`${currentUserImage}`}
								alt=""
							/>
						</div>
						<div className="username">
							<h2>{currentUserName}</h2>
						</div>
					</div>
				</Container>
			)}
		</>
	);
}
const Container = styled.div`
    display: grid;
    grid-template-rows: 80% 20%;
    overflow: hidden;
    background-color: #080420;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 2rem;
        }
        h3 {
            color: white;
            text-transform: uppercase;
        }
    }
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        background-color: #99B2DD;
        padding-top: 1rem;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
            }
        }
        .contact {
            background-color: #ffffff49;
            min-height: 5rem;
            cursor: pointer;
            width: 90%;
            border-radius: 0.2rem;
            padding: 0.4rem;
            display: flex;
            gap: 1rem;
            align-items: center;
            transition: 0.5s ease-in-out;
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
        .selected {
            background-color: #E3D3C2;
        }
    }

        .current-user {
        background-color: #7796CB;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 2rem;
        padding-left: 1rem;
        .avatar {
            img {
            height: 4rem;
            max-inline-size: 100%;
            }
        }
        .username {
            h2 {
            color: white;
            }
        }
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            gap: 0.5rem;
            .username {
            h2 {
                font-size: 1rem;
            }
            }
        }
        }
`;