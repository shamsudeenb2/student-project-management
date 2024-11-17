import styles from './chat.module.css';
import axios from 'axios';

export default async function Chat(){
    //  const res = await fetch("/api/socket");

     return(
         <div className={styles.chatBox}>
            {/* {res.data.map((msg, index) => (
            <div key={index} className={styles.message}>
              <strong>{msg.sender}:</strong> {msg.content}
            </div>
             ))} */}
         </div>
     )
}