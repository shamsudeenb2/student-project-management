'use client'

import { useFetchrecipientUser } from "@/app/hooks/userFetchRecipient";
import styles from "@/app/ui/chat/chats.module.css"
import { signIn, signOut, useSession } from "next-auth/react";
import moment from "moment";
import InputEmoji from "react-input-emoji"
import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import FadeLoader from "react-spinners/FadeLoader";


const ChatBox = ({curentChat, messages, isMessagesLoading,sendTextMessage})=>{
    const {data: session} = useSession()
    const {recipientUser} = useFetchrecipientUser(curentChat, session?.user)
    const [textMessage, setTextMessage] = useState("")
    const scroll = useRef()


    // console.log("get messages from chat boc", messages)

    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior: "smooth"})
    },[messages])

    if(!recipientUser)return(
        <p style={{textAlign: "center",width: "100%"}}>No Conversation selected yet ...</p>
    )

    if(isMessagesLoading)return(
        <p style={{textAlign: "center",width: "100%"}}>No Loading Chats ...</p>
    )

    return(
        // stack component gap 4
    <div className={styles.chat_box}> 
        <div className={styles.chat_header}>
            <strong>{recipientUser?.user.name}</strong>
        </div>
        {/* stack component gap 3*/}
        <div className={styles.messages}>
            {messages && messages?.map((message, index)=>{
                return(
                    //stack component message self align-self-end or star flex-grow:0
                    <div key ={index} className={message?.senderId === session.user?.id ?( styles.senderMessage) : styles.ReceivedMessage}
                    ref = {scroll}
                    >
                        <span>{message.text}</span>
                        <span className={styles.message_footer}>
                            {moment(message.createdAt).calendar()}
                        </span>
                    </div>
                )
            })}
        </div>
        {/* stack component direction:horizontal gap 3 flex-grow-0*/}
        <div className={styles.chat_input}>
            <InputEmoji 
            value={textMessage} 
            onChange = {setTextMessage} 
            fontFamily="nonito" 
            borderColor="rgba(72,112)" />

            <button className={styles.send_btn} onClick={()=>sendTextMessage(textMessage, session?.user?.id, curentChat._id, setTextMessage)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
            </button>
        </div>
    </div>)
}

export default ChatBox