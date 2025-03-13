'use client'
import { useFetchrecipientUser } from "@/app/hooks/userFetchRecipient"
import styles from "@/app/ui/chat/chats.module.css"
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import FadeLoader from "react-spinners/FadeLoader";

const UserChat =({chat, user, onlineUsers})=>{
    
   
    const {recipientUser}= useFetchrecipientUser(chat, user)
    
    const isOnline = onlineUsers?.some((user)=> user?.userId === recipientUser?.user?._id)
    return(
        <div className={styles.user_card_list}>
            <div className={styles.user_list}>
                <div className={styles.user_avarter_name}>
                   <div className={styles.avartar}>
                   {recipientUser?.user?.img?(<>
                    <Image src={`/profile/${recipientUser?.user?.img}`} alt="" width={40} height={40} className={styles.navItemImg}/>
                   </>):(
                    <>
                      <Image src={`/avarter.svg`} alt="" width={40} height={40} className={styles.navItemImg}/>
                    </>
                   )}
                   </div>
                   <div className={styles.text_content}>
                      <div className={styles.name}>{recipientUser?.user?.name}</div>
                      <div className={styles.text}>Text Messages</div>
                   </div>
                </div>
                <div className={styles.notfic}>
                    {/* <div className="data">
                        12/12/2023
                    </div>
                    <div className={styles.this_user_notifications}>2</div> */}
                    <span className={isOnline? styles.user_online:""}></span>
                </div>
            </div>

        </div>
    )
}

export default UserChat