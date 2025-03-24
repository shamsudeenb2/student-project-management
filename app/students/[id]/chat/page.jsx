import Chats from "@/app/ui/chat/chats";
import styles from '@/app/ui/chat/chat.module.css';

export default function ({params}){
    const {id} = params;
    console.log("chat now",id)
    return(
        <div >
         <header className={styles.header}>
        <h1>Integrative Communication Platform for supervisor and Supervisee Interaction</h1>
        <p>Send and receive messages efficiently.</p>
      </header>
            <Chats />
        </div>
    )
}