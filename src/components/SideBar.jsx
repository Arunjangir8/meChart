import React, { useEffect, useRef, useState } from 'react'
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
  const menuRef = useRef();
  const [open, setOpen] = useState(false);
  const { user, getUser, unseenMessages, setUnseenMessages, selectedUser, setSelectedUser } = useContext(ChartContext);
  const { logout, onlineUser } = useContext(AuthContext)

  const navigate = useNavigate()
  const [input, setInput] = useState("")

  const filteredUsers = input ? user.filter((u) => u.fullName.toLowerCase().includes(input.toLowerCase())) : user;


  useEffect(() => {
    getUser()
  }, [onlineUser])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`h-full p-5 rounded-r-xl md:rounded-r-none overflow-y-scroll text-white ${selectedUser ? 'max-md:hidden' : ''}`}>
      <div className='pb-5'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-4 cursor-pointer' onClick={() => navigate("/")}>
            <img src={assets.logo} alt="" className='max-w-8' />
            <Title level={4} className=' font-semibold' style={{color : "white"}}>meChat</Title>
          </div>
          <div className="relative py-2" ref={menuRef}>
      <MenuOutlined
        className="max-h-5 cursor-pointer text-gray-300 hover:text-white transition-colors"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className="absolute top-full right-0 z-20 w-36 p-2 rounded-md bg-black-800/90 backdrop-blur-sm border border-gray-600/50 text-gray-100 shadow-lg">
          <Button
            type="text"
            block
            style={{
              color: "#f3f4f6",
              fontSize: "0.875rem",
              fontWeight: 500
            }}
            className="hover:bg-gray-700/50"
            onClick={() => {
              navigate("/profile");
              setOpen(false);
            }}
          >
            Edit Profile
          </Button>

          <Divider style={{ marginBottom: "5px", marginTop: "5px", backgroundColor: "#6b7280" }} />

          <Button
            type="text"
            block
            onClick={() => {
              logout();
              setOpen(false);
            }}
            style={{
              color: "#f3f4f6",
              fontSize: "0.875rem",
              fontWeight: 500
            }}
            className="hover:bg-gray-700/50"
          >
            Logout
          </Button>
        </div>
      )}
    </div>
        </div>

        <div className='bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center gap-2 py-3 px-4 mt-5 border border-gray-600/50'>
          <SearchOutlined className='text-gray-400' style={{
            paddingRight: "8px"
          }} />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            className='bg-transparent border-none outline-none text-gray-100 text-md placeholder-gray-400 flex-1'
            placeholder='Search user ...'
          />
        </div>

      </div>

      <div className='flex flex-col gap-2'>
        {/* Fixed: Check if filteredUsers exists and has length */}
        {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div onClick={() => { setSelectedUser(user); setUnseenMessages((prev) => ({ ...prev, [user.id]: 0 })) }}
              className={`relative flex items-center gap-3 p-2 pl-4 rounded cursor-pointer max-sm:text-sm transition-colors hover:bg-gray-800/40 ${(selectedUser?.id === user.id) && 'bg-gray-800/60'}`} key={user.id}>
              <img src={user?.profilePic || assets.avatar_icon} alt="" className='w-[35px] aspect-[1/1] rounded-full object-cover border border-gray-500/30' />
              <div className='flex flex-col leading-5'>
                <p className='text-gray-100'>{user?.fullName}</p>
                {
                  onlineUser.includes(user.id)
                    ? <span className='text-green-400 text-sm'>Online</span>
                    : <span className='text-gray-400 text-sm'>Offline</span>
                }
              </div>
              {unseenMessages[user.id] > 0 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-blue-600/80 text-white shadow-md'>{unseenMessages[user.id]}</p>}
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