import React, { useContext, useEffect, useRef, useState } from 'react'
import assets from '../assets/assets'
import { AudioMutedOutlined, AudioOutlined, FileImageOutlined, InfoCircleOutlined, LeftOutlined, RocketOutlined, SendOutlined } from '@ant-design/icons'
import { ChartContext } from '../../context/ChartContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { Drawer } from 'antd'
import Loading from './Loading'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useNavigate } from 'react-router-dom'

const ChartContainor = () => {
  const { messages, selectedUser, setSelectedUser, getMessages, sendMessage } = useContext(ChartContext)
  const { authUser, onlineUser } = useContext(AuthContext)
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const scrollEnd = useRef()

  const handelSendMessage = async (e) => {
    e.preventDefault()
    if (input.trim() === "") return null
    await sendMessage({ message: input.trim() })
    setInput("")
  }

  const handelImage = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      const image = reader.result;
      await sendMessage({ image: image });
      e.target.value = null;
    }
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser) {
        setIsLoading(true);
        await getMessages(selectedUser.id);
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [selectedUser]);


  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const imgRef = useRef(null);

  const toggleSize = () => {
    imgRef.current.classList.toggle('max-w-[230px]');
    imgRef.current.classList.toggle('max-w-[600px]');
  };

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const handelMicroPhone = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: false });
    }
  };


  useEffect(() => {
    if (!listening && transcript) {
      setInput((prev)=> prev+ " " +transcript);
      resetTranscript();
    }
  }, [listening]);


  return selectedUser ? (
    <div className='md:h-full h-full overflow-scroll relative bg-white/2'>

      <div className='flex items-center gap-3 py-3 mx-4 border-b border-gray-600/20'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-8 h-8 rounded-full object-cover border border-gray-500/30 cursor-pointer' onClick={() => setIsProfileOpen(true)} />
        <p className='flex-1 text-lg text-gray-100 items-center gap-2 flex font-medium'>
          {selectedUser?.fullName}
          {onlineUser.includes(selectedUser.id) && <p className='w-2 h-2 rounded-full bg-green-400 shadow-green-400/50 shadow-sm'></p>}
        </p>
        <span className="md:hidden" >
          <LeftOutlined onClick={() => setSelectedUser(false)} style={{ color: "#e5e7eb", fontSize: "22px" }} />
        </span>
        <span className='max-md:hidden max-w-5'>
          <InfoCircleOutlined onClick={() => navigate("/about-me")} style={{ color: "#e5e7eb", fontSize: "22px" }} />

        </span>
      </div>

      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {isloading
          ? <Loading />
          : (messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== authUser.id && 'flex-row-reverse'}`}>
              {msg.image ? (
                <img
                  ref={imgRef}
                  src={msg.image}
                  alt=""
                  onClick={toggleSize}
                  className={`
                cursor-pointer transition-all duration-300 ease-in-out
                max-w-[230px]
                border border-gray-600/50 rounded-lg overflow-hidden mb-4 shadow-lg
                ${msg.senderId === authUser.id ? 'rounded-br-none' : 'rounded-bl-none'}
              `}
                />
              ) : (
                <p className={`p-3 max-w-[200px] md:text-sm font-light rounded-lg mb-4 break-all shadow-md ${msg.senderId === authUser.id
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-700 text-gray-100 rounded-bl-none'
                  }`}>{msg.text}</p>
              )}
              <div className='text-center text-xs'>
                <img src={msg.senderId === authUser.id ? authUser?.profilePic || assets.avatar_icon : selectedUser.profilePic || assets.avatar_icon} alt="" className='w-7 h-7 rounded-full object-cover border border-gray-500/30' />
                <p className='text-gray-400 text-xs mt-1'>{new Date(msg.createdAt).toISOString().slice(11, 16)}</p>
              </div>
            </div>
          )))
        }
        <div ref={scrollEnd}></div>
      </div>
      <div className='absolute bottom-0 right-0 left-0 flex items-center gap-3 p-3 bg-black/30 backdrop-blur-sm border-t border-gray-600/30'>
        <div className='flex-1 flex items-center bg-gray-800/80 px-3 rounded-full border border-gray-600/50'>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => e.key === 'Enter' ? handelSendMessage(e) : null}
            type="text"
            className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-gray-100 placeholder-gray-400 bg-transparent'
            placeholder='Send a message'
          />
          {browserSupportsSpeechRecognition && (
            <span
              onClick={handelMicroPhone}
              className={`
                w-8 h-8 mr-2 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer
                ${listening ? 'animate-pulse  ' : 'hover:opacity-70'}
              `}
            >
              {!listening 
              ? <AudioOutlined
                style={{
                  color: '#9ca3af',
                  fontSize: '20px',
                }}
              />
              : <AudioMutedOutlined 
              style={{
                  color: '#3b82f6' ,
                  fontSize: '20px',
                }}
                className="animate-bounce"

              />
            }
            </span>
          )}

          <input onChange={handelImage} type="file" className='' id='image' accept='image/png , image/jpeg' hidden />
          <label htmlFor="image">
            <span className='w-7 h-7 mr-2 cursor-pointer hover:opacity-70 transition-opacity'>
              <FileImageOutlined style={{ color: "#9ca3af", fontSize: "20px" }} />
            </span>
          </label>

        </div>
        <span onClick={handelSendMessage} className='w-10 h-10 cursor-pointer bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center rounded-full shadow-lg'>
          <RocketOutlined rotate={45} style={{ color: "white", fontSize: "24px", fontWeight: "bold", padding: "8px" }} />
        </span>
      </div>
      <Drawer
        title="User Profile"
        placement="right"
        closable={true}
        onClose={() => setIsProfileOpen(false)}
        open={isProfileOpen}
        width={300}
      >
        {selectedUser && (
          <div className='flex flex-col items-center text-center gap-4'>
            <img
              src={selectedUser.profilePic || assets.avatar_icon}
              alt="Profile"
              className='w-24 h-24 rounded-full object-cover border border-gray-500/30'
            />
            <div>
              <h3 className='text-lg font-semibold text-gray-800'>{selectedUser.fullName}</h3>
              <p className='text-gray-500 text-sm'>{selectedUser.email || 'No email provided'}</p>
            </div>
            <div className="flex flex-col w-full gap-2 mt-4 text-sm text-left text-gray-700">
              <p><strong>Status:</strong> {onlineUser.includes(selectedUser.id) ? 'Online' : 'Offline'}</p>
              <p><strong>Bio:</strong> {selectedUser.bio}</p>
            </div>

            {messages.some(msg => msg.image) && (
              <div className='mt-6'>
                <h4 className='text-base font-medium text-gray-800 mb-2'>Shared Images</h4>
                <div className="grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-1">
                  {messages
                    .filter(msg => msg.image)
                    .map((msg, i) => (
                      <img
                        key={i}
                        src={msg.image}
                        alt="shared"
                        className="w-30 h-24 object-cover rounded-md border border-gray-300 shadow-sm cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => {
                          window.open(msg.image, '_blank');
                        }}
                      />
                    ))}
                </div>
              </div>
            )}

          </div>
        )}
      </Drawer>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-400 bg-black/20 max-md:hidden backdrop-blur-sm'>
      <img src={assets.logo_big} alt="" className='max-w-40' />
      <p className='text-lg font-medium text-gray-300'>Chat Anything, Anywhere</p>
    </div>
  )
}

export default ChartContainor