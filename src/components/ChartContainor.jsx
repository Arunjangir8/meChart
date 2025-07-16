import React, { useContext, useEffect, useRef, useState } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { FileImageOutlined, InfoCircleOutlined, LeftOutlined, RocketOutlined, SendOutlined } from '@ant-design/icons'
import { ChartContext } from '../../context/ChartContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const ChartContainor = () => {
  const {messages, selectedUser, setSelectedUser, getMessages, setMessages, sendMessage} = useContext(ChartContext)
  const { authUser, onlineUser} = useContext(AuthContext)

  const [input, setInput] = useState("");

  const scrollEnd = useRef()

  // Fixed: parameter name and message structure
  const handelSendMessage = async (e) => {
    e.preventDefault()
    if (input.trim() === "") return null
    
    // Fixed: send message as 'message' not 'text'
    await sendMessage({message: input.trim()})
    setInput("")
  }

  const handelImage = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")){
      toast.error("Please select a valid image file");
      return;
    }  
    const reader = new FileReader();
    reader.onloadend = async () => {
      const image = reader.result;
      // Fixed: send image as 'image' property
      await sendMessage({image : image});
      e.target.value = null; 
    }
    reader.readAsDataURL(file);
  }

  useEffect(()=>{
    if(selectedUser){
      getMessages(selectedUser.id)
    }
  },[selectedUser])
  
  useEffect(() => {
    if(scrollEnd.current && messages){
      scrollEnd.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>

      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-8 h-8 rounded-full object-cover' />
        <p className='flex-1 text-lg text-white items-center gap-2 flex'>
          {selectedUser?.fullName}
          {onlineUser.includes(selectedUser.id) && <p className='w-2 h-2 rounded-full bg-green-500'></p>}
        </p>
        <span className="md:hidden" >
          <LeftOutlined onClick={() => setSelectedUser(false)} style={{ color: "white", fontSize: "22px" }} />
        </span>
        <span className='max-md:hidden max-w-5'>
          <InfoCircleOutlined onClick={() => setSelectedUser(false)} style={{ color: "white", fontSize: "22px" }} />
        </span>
      </div>

      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== authUser.id && 'flex-row-reverse'}`}>
            {msg.image ? (
              <img src={msg.image} alt="" className={`max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-4 ${msg.senderId === authUser.id ? ' rounded-br-none' : ' rounded-bl-none'}`} />
            ) : (
              <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-4 break-all bg-violet-500/30 text-white ${msg.senderId === authUser.id ? ' rounded-br-none' : ' rounded-bl-none'}`}>{msg.text}</p>
            )}
            <div className='text-center text-xs'>
              <img src={msg.senderId === authUser.id ? authUser?.profilePic || assets.avatar_icon : selectedUser.profilePic || assets.avatar_icon } alt="" className='w-7 h-7 rounded-full object-cover' />
              <p className='text-gray-500'>{new Date(msg.createdAt).toISOString().slice(11, 16)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      <div className=' absolute bottom-0 right-0 left-0 flex items-center gap-3 p-3'>
        <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
          <input 
            onChange={(e)=> setInput(e.target.value)} 
            value={input}
            onKeyDown={(e)=> e.key === 'Enter' ? handelSendMessage(e) : null }
            type="text" 
            className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400' 
            placeholder='Send a message' 
          />
          <input onChange={handelImage} type="file" className='' id='image' accept='image/png , image/jpeg' hidden />
          <label htmlFor="image">
            <span className='w-5 mr-2 cursor-pointer'>
              <FileImageOutlined style={{ color: "white", fontSize: "20px" }} />
            </span>
          </label>
        </div>
        <span onClick={handelSendMessage} className='w-10 h-10 cursor-pointer bg-violet-500 flex items-center justify-center rounded-full'>
          <RocketOutlined rotate={45} style={{ color: "white", fontSize: "24px",fontWeight : "bold",padding:"8px" }}/>
        </span>
      </div>

    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
      <img src={assets.logo_icon} alt="" className='max-w-16' />
      <p className='text-lg font-medium text-white'>Chat Anything, Anywhere</p>
    </div>
  )
}

export default ChartContainor