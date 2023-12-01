import './App.css'
import { useEffect,Suspense } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { io } from 'socket.io-client'
import { Login } from './components/Login'
import { Messages } from './components/Messages'
import { Register } from './components/Register'
import { RequireAuth } from './components/RequireAuth'
import styled from 'styled-components'
import { Prueba } from './components/prueba'
import { Unauthorized } from './components/Unauthorized'

function App () {

const socket = io('http://localhost:4000')

useEffect(() => {
  socket.on('connect', () => {
    console.log('Conectado al servidor');
  })
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <Container>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          {/* Rutas no protegidas/Publicas */}
          <Route path="/" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/unauthorized" element={<Unauthorized/>}/>

          {/* Rutas protegidas, en vez de acerlo una a una, se envuelve todo a la vez*/}

          {/* Rutas donde pueden ingresar usuarios y admimintradores */}
          <Route element={<RequireAuth allowedRoles={[1,2]} />}>
            <Route path="/messages" element={<Messages/>}/>
          </Route>

          {/* Rutas donde pueden ingresar admimintradores */}
          <Route element={<RequireAuth allowedRoles={[1]} />}>
            <Route path="/prueba" element={<Prueba/>}/>
          </Route>

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
