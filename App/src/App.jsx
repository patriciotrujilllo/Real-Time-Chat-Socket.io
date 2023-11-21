import './App.css'
import { useEffect,Suspense } from 'react'
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import { io } from 'socket.io-client'
import { Login } from './components/Login'
import { Messages } from './components/Messages'
import { useCookies } from 'react-cookie'

function App () {

const socket = io('http://localhost:4000')
const [cookie] = useCookies(['token'])

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
          <Route path="/messages" element={cookie?.token ? <Messages/> : <Navigate to='/'/>}/>

        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
