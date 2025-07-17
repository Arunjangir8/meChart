import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { ChartContext } from '../../context/ChartContext'
import { AuthContext } from '../../context/AuthContext'
import Loading from './Loading'

const RightSideBar = () => {
  const {selectedUser, messages} = useContext(ChartContext)
  const {logout, onlineUser} = useContext(AuthContext)
  const [msgImage, setMsgImage] = useState([])
  const [isloading, setIsLoading] = useState(false);

 useEffect(() => {
    const processImages = () => {
      setIsLoading(true);

      const filteredImages = messages
        .filter(
          msg =>
            msg.image &&
            (msg.senderId === selectedUser?.id || msg.receiverId === selectedUser?.id)
        )
        .map(msg => msg.image);

      setMsgImage(filteredImages);
      setIsLoading(false);
    };

    if (selectedUser) {
      processImages();
    }
  }, [messages, selectedUser]);

  return (
    <div className={`text-white w-full overflow-y-scroll relative ${selectedUser ? 'max-md:hidden': ''}`}>
      <div className='pt-16 flex items-center flex-col gap-2 text-xs font-light mx-auto'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt=""
        className='w-20 aspect-[1/1] rounded-full object-cover border border-gray-500/30 shadow-lg'/>
        <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2 text-gray-100'>
          {onlineUser.includes(selectedUser.id) && <p className='w-2 h-2 rounded-full bg-green-400 shadow-green-400/50 shadow-sm'></p>}
          {selectedUser.fullName}
        </h1>
        <p className='px-10 mx-auto text-gray-300'>{selectedUser.bio}</p>
      </div>

      <hr className='border-gray-600/50 my-4'/>

      <div className='px-5 text-xs'>
        <p className='text-gray-300 font-medium mb-2'>Media</p>
        <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4'>
          {isloading ? (
            <Loading />
          ) : msgImage.length > 0 ? (
            msgImage.map((img, index) => (
              <div
                key={index}
                onClick={() => {
                  window.open(img);
                }}
                className="cursor-pointer rounded-md hover:opacity-80 transition-opacity"
              >
                <img
                  src={img}
                  className="h-full rounded-md object-cover border border-gray-600/30 shadow-md"
                  alt=""
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-2 text-center">No media shared yet.</p>
          )}
        </div>
      </div>

      <button onClick={logout} className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer transition-all duration-200 shadow-lg'>
        Logout
      </button>
    </div>
  )
}

export default RightSideBar