import Image from "next/image";
import Link from "next/link";
import styles from "../../ui/admin/adminHome.module.css"
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

const AdminHome = async ({ params }) => {
const {id} = params
console.log('id',id)
  return (
    <div className={styles.container}>
        <div className={styles.content}>
            <div className={styles.cardContainer}>
            <Link href={`/students/${id}/chat`}>
              <div className={styles.cards}>
                <p>Chat</p>
              </div>
              </Link>
              <Link href={`/students/${id}/files`}>
              <div className={styles.cards}>
                <p>Project Files</p>
              </div>
              </Link>
            </div>
        </div>
    </div>
  );
};

export default AdminHome;
