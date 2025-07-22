import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext'
import { useEffect } from "react";
import axios from "axios";

export default function Logout() {

    const navigate = useNavigate()
    const {setUser} = useAuth()

    useEffect(() => {
        async function logout() {
            await axios.post('/api/account/logout')
            setUser(null)
            navigate('/')
        }
        logout()
    },[])
    return <></>
}