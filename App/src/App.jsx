import './App.css'
import { io } from 'socket.io-client'
import { useState,useEffect } from 'react'

const socket = io('http://localhost:4000')

function App() {

  const [isConnected,setIsConnected] = useState(false)
  // const [newMessage,setNewMessage] = useState('')
  // const [messages,setMessages] = useState([])

  useEffect(()=>{

    socket.on('connect',()=> setIsConnected(true))

  },[])

  return (
    <>
      <h1>Esta Funcionando</h1>
      <h2>{isConnected ? 'Esta conectado al socket': 'No se conecto al socket'}</h2>
      
    </>
  )
}

export default App
