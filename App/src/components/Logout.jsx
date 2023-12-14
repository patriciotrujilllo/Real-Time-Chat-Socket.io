import useLogout from "../hooks/useLogout"
import styled from "styled-components"
import { LogoutIcon } from "./Icons"

const Logout = () => {
	const logout = useLogout()

	return (
		<Button onClick={logout}>
			<LogoutIcon/>
		</Button>
	)
}

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    &:hover {
        background-color: #ebe7ff;
        svg {
        color: #9a86f3;
    }
    }
    svg {
        font-size: 1.3rem;
        color: #ebe7ff;
        width: 2rem;
        height: 2rem;
    }
`

export default Logout