import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Loader from './Loader'
const AuthContext = createContext()


export default function AuthProvider({children}){

    const [ user, setUser] = useState()
    const [ isLoading, setIsLoading] = useState()

    useEffect(()=>{
        async function loadUser() {
            const {data} =await axios.get('/api/account/getcurrentuser')
            setUser(data)
            setIsLoading(false)
        }
        loadUser()
    },[])

    return isLoading ? <Loader/> : <AuthContext.Provider value={{user, setUser}}>
        {children}
    </AuthContext.Provider>
}
const useAuth = () => useContext(AuthContext)

export{useAuth}