import { createContext,useState } from "react";

export const AuthContext = createContext()

const initialState = JSON.parse(window.localStorage.getItem('auth')) || {}

export const AuthProvider = ({children}) =>{
    const [auth,setAuth] = useState(initialState)

    return(
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}