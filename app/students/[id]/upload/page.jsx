import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ui/admin/adminHome.module.css"
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import UploadFile from "@/app/ui/student/uploadFile";

const UploadHome = async ({ params }) => {
  return(
    <div className={styles.container}>
      <div className={styles.content}>
        <UploadFile />
      </div>
    </div>
  )
}

export default UploadHome;