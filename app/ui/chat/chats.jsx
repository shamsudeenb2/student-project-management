'use client'

import {useState, useEffect, useCallback} from "react"
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "@/app/ui/chat/chats.module.css"
import UserChat from "@/app/component/chat/UserChat";
import PotentialChats from "@/app/component/chat/PotentialChats";
import ChatBox from "@/app/component/chat/chatBox";
import { io } from "socket.io-client";
import { ToastContainer, toast } from 'react-toastify';
import FadeLoader from "react-spinners/FadeLoader";


 const ChatContex = ({})=>{
    const [userChats, setUserChats] = useState([])
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false)
    const [userChatsError, setUserChatsError] = useState(null)
    const [potentialChats, setPotentialChats] = useState([])
    const [curentChat, setcurentChat] = useState(null)
    const [messages, setMessages]= useState(null)
    const [sendMessageError, setSendMessageError] = useState(null)
    const [newMessage,setNewMessage] = useState(null)
    const [isMessagesLoading, setMessagesLoading] =useState(false)
    const [messagesError, setMessagesError] = useState(null)
    const [socketSate, setSocketState] = useState(null)
    const [onLineUsers, setOnLineUsers]= useState([])
    const {data: session} = useSession()
    const [creatChatLoading, setCreatChatLoading]= useState(false)
    const [notifications, setNotifications]=useState([])
    

    console.log("Notification", notifications)
    useEffect(()=>{
        const newSocket = io("http://localhost:5000")
        setSocketState(newSocket)
        return()=>{
            newSocket.disconnect()
        }
    },[session?.user])

    // add online user
    useEffect(()=>{
        if(socketSate === null) return 
        socketSate.emit("addNewUser", session?.user?.id)
        socketSate.on("getOnlineUsers", (res)=>{
            setOnLineUsers(res)
        })

        return () =>{
            socketSate.off("getOnlineUsers")
        }
    },[socketSate])

    //send message
    useEffect(()=>{
        if(socketSate === null) return 
        const recipientId=curentChat?.members.find((id)=> id !== session?.user?.id)
       socketSate.emit("sendMessage",{...newMessage, recipientId})
    },[newMessage])

    //receive message and notification
    useEffect(()=>{
        if(socketSate === null) return 
        socketSate.on("getMessage", res =>{
            if(curentChat?._id !== res.chatId) return
            setMessages((prev)=>[...prev, res])
        })

        socketSate.on("getNotification", (res)=>{
            const isChatOpen = curentChat?.members.some(id => id ===res.senderId)

            if(isChatOpen){
                setNotifications(prev =>[{...res, isRead:true}, ...prev])
            }else{
                setNotifications(prev => [res, ...prev])
            }
        })

        return ()=>{
            socketSate.off("getMessage")
            socketSate.off("getNotification")
        }
    },[socketSate,curentChat])

    //get find if a student has chatted with his supervisor
    useEffect(()=>{
        const getUsers = async()=>{
            const checkRole = session?.user?.role ==="staff"?"student":"staff"
            const response = await fetch(`/api/charts/userChat?id=${checkRole}`) //find all users that have different roles from currently login user    
            if(response.ok){
                const data = await response.json();
                
               const pChats = data?.users?.filter((u)=>{  //
                let isChatCreated =false
                
                if(session?.user?.id === u._id) return false;

                if(session?.user?.role==="student"){
                    if(session?.user?.supervisor === u._id){
                        if(userChats){
                            isChatCreated=userChats?.some((chat)=>{
                                return chat.members[0] === u._id || chat.members[1] ===u._id
                            })
                        }
                        return !isChatCreated
                    }
                }else if(session?.user?.role ==="staff"){
                    console.log("is user a staff", session?.user.id, u.supervisor)
                    if(session?.user?.id === u.supervisor){
                        if(userChats){
                            isChatCreated=userChats?.some((chat)=>{
                                return chat.members[0] === u._id || chat.members[1] ===u._id
                            })
                        }
                        return !isChatCreated

                    }
                }
                   
               });
               
               setPotentialChats(pChats)
            }
            
        }
        getUsers()
    },[userChats])


    useEffect(()=>{
        const getChats= async()=>{
            setIsUserChatsLoading(true)
            setUserChatsError(null)
            
            const response = await fetch(`/api/charts/${session?.user.id}`)
            setIsUserChatsLoading(false)
            
            if(response.error){
                console.log("error response", response)
            }
            if(response.ok){
                const data = await response.json();
                setUserChats(data.chats)
            }
            
            // return setUserChatsError(response)
        }

    getChats()
        // if (session){
        //     setIsUserChatsLoading(true)
        //     setUserChatsError(null)
        //     fetch(`/api/chats/?id=${session?.user?.id}`)
        //     .then((res) => res.json())
        //     .then((data) => {
        //       setUserChats(data)
        //       setIsUserChatsLoading(false)
        //     })

        //     if(response.error){
        //         return setUserChatsError(response)
        //      }
        //     }
    }, [session?.user])

    useEffect(()=>{
        const getMessages= async()=>{
            
                setMessagesLoading(true)
                setMessagesError(null)
                const response = await fetch(`/api/messages?id=${curentChat?._id}`)
                setMessagesLoading(false)

                if(response.error){
                    return setMessagesError(response.error)
                }
                const data = await response.json();
                console.log("You must type something ...", data)
                setMessages(data.messages)
        }
        getMessages()
    },[curentChat])

    const sendTextMessage = useCallback(async(textMessage, sender, curentChatId, setTextMessage)=>{
        if(!textMessage) return console.log("You must type something ...")

         const response = await fetch(`/api/messages`,{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chatId: curentChatId,
                    senderId: sender,
                    text:textMessage
                }), // Wrap in an object with a 'data' key
              });

              if(response.error){
                return setSendMessageError(response)
            }

            
              if(response.ok){
                const data = await response.json();
                setNewMessage(data.response)
                setMessages((prev)=>[...prev, data.response])
                setTextMessage("")
              }

    },[])

    const updateCurentChat = useCallback((chat)=>{
        console.log("setting curren chat", chat)
        setcurentChat(chat)
    },[])
    
    const createChat = useCallback(async(lecturerId, studentId)=>{
        setCreatChatLoading(true)
        const response = await fetch(`/api/charts`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({lecturerId:lecturerId,studentId:studentId}), // Wrap in an object with a 'data' key
          });
          const data = await response.json();
          setCreatChatLoading(false)
          if(response.ok){
            const respons = await fetch(`/api/charts/${session?.user.id}`)
            if(respons.ok){
                const data = await respons.json();
                
                setUserChats(data.chats)
            }
            // setUserChats((prev) => {
            //     console.log('prev:', prev, 'newChats:', data.response);  // Debugging
            //     if (Array.isArray(prev) && Array.isArray(data.response)) {
            //       return [...prev, ...data.response];
            //     }
            //     return prev;
            //   });
            // setUserChats((prev) => [...prev, ...data.chats]);
          }
    },[])

    return(
        <div className={styles.container}>
          <div className={styles.chatsContentList}>
             <PotentialChats potentialChats ={potentialChats} createChat={createChat} creatChatLoading={creatChatLoading}/>
             {userChats?.length < 1?null : (
                <div className={styles.chatContent}>
                 <div className={styles.chatList}>
                    {isUserChatsLoading && <p>Loading Chats ...</p>}
                    {userChats?.map((chat,index)=>{
                        return(
                            <div key={index} onClick={()=> updateCurentChat(chat)}>
                                <UserChat chat={chat} user={session?.user} onlineUsers={onLineUsers}/>
                            </div>
                        )
                    })}
                 </div>
                </div>

              ) }
             </div>
         <ChatBox  curentChat={curentChat} messages={messages} isMessagesLoading={isMessagesLoading} sendTextMessage={sendTextMessage}/>
        </div>
    )
}

export default ChatContex