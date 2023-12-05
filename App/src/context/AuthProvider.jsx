import { createContext,useState } from "react";

export const AuthContext = createContext()

// const initialState = JSON.parse(window.localStorage.getItem('auth')) ? JSON.parse(window.localStorage.getItem('auth')) : {}

export const AuthProvider = ({children}) =>{
    const [auth,setAuth] = useState({})

    const updateAuth = (result) => {
        const newAuth = {...result}
        // window.localStorage.setItem('auth', JSON.stringify(newAuth))
        console.log(`Esto es en el context: `,newAuth)
        setAuth(newAuth)
    }

    const updateAuthLogin = (newAuth) => {
        console.log(newAuth)
        // window.localStorage.setItem('auth', JSON.stringify(newAuth))
        setAuth(newAuth)
    }

    return(
        <AuthContext.Provider value={{auth,updateAuth,updateAuthLogin}}>
            {children}
        </AuthContext.Provider>
    )
}