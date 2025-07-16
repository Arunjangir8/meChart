import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import {Toaster} from "react-hot-toast"
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const App = () => {
  const {authUser} = useContext(AuthContext)
  return (
    <div className='bg-[url("./src/assets/sep09.jpg")] bg-cover bg-no-repeat'>
      <Toaster
  position="top-right"
  toastOptions={{
    style: {
      background: '#111', 
      color: '#ffffff',   
      border: '1px solid #007bff', 
      fontWeight: 400,
      padding: '12px 16px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
      minWidth: '250px',
      height : "50px"
    },
    success: {
      iconTheme: {
        primary: '#007bff', 
        secondary: '#ffffff', 
      },
    },
    error: {
      iconTheme: {
        primary: '#ff4d4f', // a nice classic error red
        secondary: '#ffffff',
      },
    },
  }}
/>

      <Routes>
        <Route path='/' element={ authUser ? <HomePage/> : <Navigate to={"/login"}/>}/>
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to={"/"}/>}/>
        <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to={"/login"}/>}/>
      </Routes>
    </div>
  )
}

export default App
