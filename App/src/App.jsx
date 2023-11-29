import './App.css'
import { useEffect,Suspense } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { io } from 'socket.io-client'
import { Login } from './components/Login'
import { Messages } from './components/Messages'
import { Register } from './components/Register'
import styled from 'styled-components'

function App () {

const socket = io('http://localhost:4000')

useEffect(() => {
  socket.on('connect', () => {
    console.log('Conectado al servidor');
  })
}, []);

  return (
    <Container>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/messages" element={<Messages/>}/>

        </Routes>
      </BrowserRouter>
    </Suspense>
    </Container>
  )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
`

export default App
