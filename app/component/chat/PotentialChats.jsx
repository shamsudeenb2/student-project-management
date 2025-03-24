'use client'

import styles from "@/app/ui/chat/chats.module.css"
import { signIn, signOut, useSession } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import FadeLoader from "react-spinners/FadeLoader";

const PotentialChats = ({potentialChats, createChat, onlineUsers, creatChatLoading})=>{
    const {data: session} = useSession()
    console.log("potential chart",potentialChats?.length > 0?"true":"false")
    return (
        <>
         <div className={styles.all}>
            {creatChatLoading && <p>Creating Chat</p>}
            {potentialChats&&(
                <>
                  {potentialChats.map((u, index)=>{
                    return(
                      <div className={styles.single} key={index} onClick={()=> createChat(u._id, session?.user?.id)}>
                        {u.name}
                        <span className={onlineUsers?.some((user)=> user?.userId === u?._id)?
                        styles.user_online : ""}></span>
                      </div>
                    )
            })}
                </>
            // ):(<>
            // <p>{session?.user?.role==='staff'?"You are not assign to any student":"You either didn't register for project or You are not assigned a supervisor"}</p>
            // </>
            )}
         </div>
        </>
    )
}

export default PotentialChats