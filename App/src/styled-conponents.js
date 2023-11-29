import styled from 'styled-components'

export const FormContainer = styled.div`
    width: 600px;
    aspect-ratio: 1/1;
    display: grid;
    place-items: center;
    background-color: #505083;
    border-radius: 2rem;
    form {
        width: 70%;
        display:flex;
        gap: 0.7rem;
        flex-direction:column;
        input {
        padding: 0.4rem;
        border-radius: 5px;
        }
        button {
            background-color: #b172d8;
            padding: 1rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            text-transform: uppercase;
            &:hover{
                background-color: white;
            }
        }
    }
    
`