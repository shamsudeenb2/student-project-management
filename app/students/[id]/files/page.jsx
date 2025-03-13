import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ui/student/studentFiles.module.css";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import DownloadFile from "@/app/ui/student/downloadFile";
import FileSharing from "@/app/ui/student/ShareFiles";


const DownloadHome = async ({ params }) => {
  return(
    <div className={styles.container}>
          <FileSharing/>
    </div>
  )
}

export default DownloadHome;