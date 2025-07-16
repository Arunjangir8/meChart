import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext"; 
import toast from "react-hot-toast";

export const ChartContext = createContext();

export const ChartProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const { socket, axios } = useContext(AuthContext);

    const getUser = async () => {
        try {
            const {data} = await axios.get("/api/messages/users")
            if (data.success) {
                setUser(data.users);
                setUnseenMessages(data.unseenMessages);
            }
        } catch (error) {
            console.error("Error fetching user:", error);   
            toast.error("Failed to fetch user data");
        }
    }

    const getMessages = async (userId) => {
        try {
           const {data} = await axios.get(`/api/messages/${userId}`);
            if (data.success) {
                setMessages(data.messages);
            } else {
                toast.error("Failed to fetch messages");
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
            toast.error("Failed to fetch messages");
        }
    }

    // Fixed: Accept messageData object with message or image
    const sendMessage = async (messageData) => {
        try {
            if (!selectedUser) {
                toast.error("No user selected");
                return;
            }

            const {data} = await axios.post(`/api/messages/send/${selectedUser.id}`, messageData);
            if (data.success) {
                setMessages((prevMessages) => [...prevMessages, data.newMessage]);
            } else {
                toast.error("Failed to send message");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message");
        }
    }

    const subscribeToMessages = ()=>{
        if (!socket) return;
        socket.on("newMessage", (newMessage) => {
            if (selectedUser && newMessage.senderId === selectedUser.id){
                newMessage.seen = true;
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                axios.put(`/api/messages/mark/${selectedUser.id}`)
            }else{
                setUnseenMessages((prev)=>({
                    ...prev,
                    [newMessage.senderId]: (prev[newMessage.senderId] ? prev[newMessage.senderId] : 0) + 1
                }))
            }
        })
    }

    const unsubscribeFromMessages = () => {
        if (!socket) return;
        socket.off("newMessage");
    }

    useEffect(()=>{
        subscribeToMessages();
        return () =>{
            unsubscribeFromMessages();
        }
    },[socket, selectedUser]);

    const value = {
        messages,
        user,
        selectedUser,
        setSelectedUser,
        getUser,
        getMessages,
        sendMessage,
        unseenMessages,
        setUnseenMessages
    }
  return (
    <ChartContext.Provider value={value}>
      {children}
    </ChartContext.Provider>
  );
}