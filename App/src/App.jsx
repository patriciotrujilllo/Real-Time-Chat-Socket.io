import './App.css'
import { useEffect,Suspense } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { io } from 'socket.io-client'
import { Login } from './components/Login'
import { Messages } from './components/Messages'

function App () {

const socket = io('http://localhost:4000')

useEffect(() => {
  socket.on('connect', () => {
    console.log('Conectado al servidor');
  })
}, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login/>}/>
          <Route path="/messages" element={<Messages/>}/>

        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
