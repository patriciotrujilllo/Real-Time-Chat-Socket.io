import { createContext,useState } from "react";

export const AuthContext = createContext()

const initialState = JSON.parse(window.localStorage.getItem('auth')) ? JSON.parse(window.localStorage.getItem('auth')) : {}

export const AuthProvider = ({children}) =>{
    const [auth,setAuth] = useState(initialState)

    const updateAuth = ({accessToken}) => {
        console.log(accessToken)
        const newAuth = {...auth, accessToken}
        window.localStorage.setItem('auth', JSON.stringify(newAuth))
        setAuth(newAuth)
    }

    const updateAuthLogin = (newAuth) => {
        window.localStorage.setItem('auth', JSON.stringify(newAuth))
        setAuth(newAuth)
    }

    return(
        <AuthContext.Provider value={{auth,updateAuth,updateAuthLogin}}>
            {children}
        </AuthContext.Provider>
    )
}