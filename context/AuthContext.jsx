import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {io} from "socket.io-client"

const backendurl = import.meta.env.VITE_BACKEND_URL
axios.defaults.baseURL = backendurl

export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [token , setToken] = useState(localStorage.getItem("token"))
    const [authUser, setAuthUser]=useState(null);
    const [onlineUser, setOnlineUser]=useState([]);
    const [socket, setSocket]=useState(null);

    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common["token"] = token;
        } else {
            delete axios.defaults.headers.common["token"];
        }
    };
    
    const checkAuth = async () =>{
        try {
            const {data} = await axios.get("/api/auth/check")
            if (data.success){
                setAuthUser(data.user)
                connectSocket(data.user)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const connectSocket = async (userData) =>{
        if(!userData || socket?.connected) return
        const newSocket = io(backendurl,{
            query : {
                userId : userData.id
            }
        })
        newSocket.connect()
        setSocket(newSocket)

        newSocket.on("getOnlineUsers",(userIds)=>{
            setOnlineUser(userIds)
        })
    }

    const login = async (states, credentials) =>{
        try {
            const {data} = await axios.post(`/api/auth/${states}`, credentials)
            if (data.success){
                setAuthUser(data.userData)
                connectSocket(data.userData)
                axios.defaults.headers.common["token"]= data.token;
                setToken(data.token)
                localStorage.setItem("token",data.token)
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const logout = () =>{
        localStorage.removeItem("token")
        setToken(null)
        setAuthUser(null)
        setOnlineUser([])
        axios.defaults.headers.common["token"] = null;
        toast.success("Logout Successfully")
        if (socket) {
            socket.disconnect()
        }
    }

    const updateProfile = async (body) =>{
        try {
            const {data} = await axios.put("/api/auth/update-profile",body)
            if (data.success){
                setAuthUser(data.user)
                toast.success("Updated Profile")
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if (token){
            setAuthToken(token);
        }
        checkAuth()
    },[])

    const value = {
        axios,
        authUser,
        onlineUser,
        socket,
        login,
        logout,
        updateProfile,
        
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}