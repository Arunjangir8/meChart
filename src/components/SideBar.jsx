import React from 'react'
import { MenuOutlined, SearchOutlined } from "@ant-design/icons"
import assets, { userDummyData } from '../assets/assets'
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
const { Title, Text, Link } = Typography;

const SideBar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate()
  const {logout} = useContext(AuthContext)
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
          <input type="text" className='bg-transparent border-none outline-none text-white text-md placeholder-[#c8c8c8] flex-1' placeholder='Search user ...'/>

        </div>

      </div>

      <div className='flex flex-col gap-2'>
          {userDummyData.map((user,index)=>(
            <div onClick={()=>{setSelectedUser(user)}}
            className={`relative flex items-center gap-3 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${(selectedUser?._id === user._id) && 'bg-[#282142]/50'}`} key={index}>
              <img src={user?.profilePic || assets.avatar_icon} alt="" className='w-[35px] aspect-[1/1] rounded-full'/>
              <div className='flex flex-col leading-5'>
                <p>{user.fullName}</p>
                {
                  index<3 
                  ? <span className='text-green-500 text-sm'>Online</span>
                  : <span className='text-neutral-500 text-sm'>Offline</span>
                }
              </div>
              {index>2 && <p className=' absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>{index}</p>}
            </div>
          ))}
      </div>

    </div>
  )
}

export default SideBar
