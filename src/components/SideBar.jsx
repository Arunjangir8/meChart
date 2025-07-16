import React, { useEffect, useState } from 'react'
import { MenuOutlined, SearchOutlined } from "@ant-design/icons"
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Card,
  Typography,
  Divider,
  Space,
  Checkbox,
  Row,
  Col,
  Input,
  Form
} from 'antd';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChartContext } from '../../context/ChartContext';
const { Title, Text, Link } = Typography;

const SideBar = () => {

  const { user, getUser, unseenMessages,setUnseenMessages, selectedUser, setSelectedUser } = useContext(ChartContext);
  const {logout, onlineUser} = useContext(AuthContext)

  const navigate = useNavigate()
  const [input, setInput] = useState("") 

  const filteredUsers = input ? user.filter((u) => u.fullName.toLowerCase().includes(input.toLowerCase())) : user;


  useEffect(()=>{
    getUser()
  },[onlineUser])

  return (
    <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl md:rounded-r-none overflow-y-scroll text-white ${selectedUser ? 'max-md:hidden' : ''}`}>
      <div className='pb-5'>
        <div className='flex justify-between items-center'>
          <img src={assets.logo} alt="" className='max-w-40' />
          <div className='relative py-2 group'>
            <MenuOutlined className='max-h-5 cursor-pointer' />
            <div className='absolute top-full right-0 z-20 w-36 p-2 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
              <Button type="text" block style={{
                color: "#f3f4f6",
                fontSize: "0.875rem",
              }} onClick={() => navigate("/profile")}>
                Edit Profile
              </Button>

              <Divider style={{ marginBottom: "5px", marginTop: "5px", backgroundColor: "white" }} />

              <Button type="text" block 
              onClick={logout}
              style={{
                color: "#f3f4f6",
                fontSize: "0.875rem"
              }}>
                Logout
              </Button>
            </div>
          </div>
        </div>

        <div className='bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5'>
          <SearchOutlined style={{
            paddingRight : "8px"
          }}/>
          <input  
            onChange={(e)=> setInput(e.target.value)} 
            value={input}
            type="text" 
            className='bg-transparent border-none outline-none text-white text-md placeholder-[#c8c8c8] flex-1' 
            placeholder='Search user ...'
          />
        </div>

      </div>

      <div className='flex flex-col gap-2'>
          {/* Fixed: Check if filteredUsers exists and has length */}
          {filteredUsers && filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div onClick={() => {setSelectedUser(user); setUnseenMessages((prev)=>({...prev, [user.id]: 0}))}}
              className={`relative flex items-center gap-3 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${(selectedUser?.id === user.id) && 'bg-[#282142]/50'}`} key={user.id}>
                <img src={user?.profilePic || assets.avatar_icon} alt="" className='w-[35px] aspect-[1/1] rounded-full object-cover'/>
                <div className='flex flex-col leading-5'>
                  <p>{user?.fullName}</p>
                  {
                    onlineUser.includes(user.id)
                    ? <span className='text-green-500 text-sm'>Online</span>
                    : <span className='text-neutral-500 text-sm'>Offline</span>
                  }
                </div>
                {unseenMessages[user.id] > 0 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>{unseenMessages[user.id]}</p>}
              </div>
            ))
          ) : (
            <div className='text-center text-gray-400 py-4'>
              {input ? 'No users found' : 'No users available'}
            </div>
          )}
      </div>

    </div>
  )
}

export default SideBar