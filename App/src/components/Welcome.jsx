import styled from "styled-components"
import Robot from "../assets/robot.gif"
import Logout from "./Logout";
const Welcome = ({userName}) => {
	
	return (
		<Container>
			<div className="positionLogout">
				<Logout/>
			</div>
			
			<img src={Robot} alt="" />
			<h1>
        Welcome, <span>{userName}!</span>
			</h1>
			<h3>Please select a chat to Start messaging.</h3>
		</Container>
	);
}

export default Welcome

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
    background-color: #3a405a6a;
    img {
        height: 20rem;
    }
    span {
        color: #4e0eff;
    }
    .positionLogout {
        position: absolute;
        top: 4.5rem;
        right: 9.2rem;
    }
`;