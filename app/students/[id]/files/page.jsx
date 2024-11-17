import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ui/student/studentFiles.module.css";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import DownloadFile from "@/app/ui/student/downloadFile";

const DownloadHome = async ({ params }) => {
  return(
    <div className={styles.container}>
          <DownloadFile/>
    </div>
  )
}

export default DownloadHome;