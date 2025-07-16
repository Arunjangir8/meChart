import React, { useContext, useEffect, useState } from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { ChartContext } from '../../context/ChartContext'
import { AuthContext } from '../../context/AuthContext'

const RightSideBar = () => {
  const {selectedUser, messages} = useContext(ChartContext)
  const {logout, onlineUser} = useContext(AuthContext)
  const [msgImage, setMsgImage] = useState([])

 useEffect(() => {
  setMsgImage(
    messages
      .filter(
        msg =>
          msg.image &&
          (msg.senderId === selectedUser.id || msg.receiverId === selectedUser.id)
      )
      .map(msg => msg.image)
  );
}, [messages, selectedUser]);

  return (
    <div className={`bg-[#8185B2]/10 text-white w-full overflow-y-scroll relative ${selectedUser ? 'max-md:hidden': ''}`}>
      <div className='pt-16 flex items-center flex-col gap-2 text-xs font-light mx-auto'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt=""
        className='w-20 aspect-[1/1] rounded-full object-cover'/>
        <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
          {onlineUser.includes(selectedUser.id) && <p className='w-2 h-2 rounded-full bg-green-500'></p>}
          {selectedUser.fullName}
        </h1>
        <p className='px-10 mx-auto'>{selectedUser.bio}</p>
      </div>

      <hr className='border-[#ffffff50] my-4'/>

      <div className='px-5 text-xs'>
        <p>Media</p>
        <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
          {msgImage.map((img,index)=>(
            <div key={index} onClick={()=>{window.open(img)}} className='cursor-pointer rounded'>
                <img src={img} className='h-full rounded-md object-cover' alt="" />
            </div>
          ))}
        </div>
      </div>

      <button onClick={logout} className=' absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}

export default RightSideBar
