import ChatPost from "@/app/ui/chat/chatpost";
import Chatdis from "@/app/ui/chat/chatdis";
import styles from '@/app/ui/chat/chat.module.css';

export default function ({params}){
    const {id} = params;
    console.log("chat now",id)
    return(
        <div className={styles.container}>
            <Chatdis uId={id}/>
            <ChatPost uId={id}/>
        </div>
    )
}