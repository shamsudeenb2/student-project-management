import Chats from "@/app/ui/chat/chats";
import styles from '@/app/ui/chat/chat.module.css';

export default function ({params}){
    const {id} = params;
    console.log("chat now",id)
    return(
        <div >
            <Chats />
        </div>
    )
}