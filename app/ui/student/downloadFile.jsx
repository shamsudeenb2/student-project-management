'use client'

import Head from "next/head";
import styles from "@/app/ui/student/studentFiles.module.css";
import {useState, useEffect, useCallback} from "react"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import moment from "moment";
import UploadFileModal from "@/app/component/ModalUploadFile";
import { ToastContainer, toast } from 'react-toastify';
import FadeLoader from "react-spinners/FadeLoader";

export default function DownloadFile({searchParams}) {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const {data: session} = useSession()
    const router = useRouter() 
    const [downloadStatus, setDownloadStatus] = useState("");

    const [filesUrl, setFilesUrl] = useState([])
  const [filesUrlLoading, setLoadingFilesUrl] = useState(false)
  const [filesUrlError, setFilesUrlError] = useState(null)
  const [userChats, setUserChats] = useState([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [userChatsLoading, setIsUserChatsLoading] = useState(false)
 
  

//   const deleteFileUrl = async (id) => {
//     try {
//       const response = await fetch(`/api/actions/postUser?id=${id}`, {
//         method: 'DELETE',
//       });
  
//       if (response.ok) {
//         console.log('deleteSupabaseItem - ResponseOK - data deleted',);
//         router.push("/admin/Student");
//       } else {
//         // Handle the error
//         console.log('deleteSupabaseItem - Response not OK');
//       }
//     } catch (error) {
//       console.log('deleteSupabaseItem - try/catch error');
//       console.error('deleteSupabaseItem - try/catch error - error', error);
//     }
//   };


  useEffect(()=>{
    const getChats= async()=>{
        setIsUserChatsLoading(true)
        
        const response = await fetch(`/api/charts/${session?.user.id}`)
        setIsUserChatsLoading(false)
        
        if(response.error){
            console.log("error response", response)
        }
        if(response.ok){
            const data = await response.json();
            console.log("user chart", data.chats[0])
            setUserChats(data.chats[0])
        }
        
        // return setUserChatsError(response)
    }

getChats()
}, [session?.user])

useEffect(()=>{
    const getfilesUrl= async()=>{
        setLoadingFilesUrl(true)
        setFilesUrlError(null)
            const response = await fetch(`/api/upload?id=${userChats?._id}`)
            setLoadingFilesUrl(false)

            if(response.error){
                return setFilesUrlError(response.error)
            }
            const data = await response.json();
            console.log("You must type something ...", data)
            setFilesUrl(data.fileUrls)
    }
    getfilesUrl()
},[userChats])

    const downloadFavicon = async (filename) => {
        // const filename="PMG_letter.docx"
        try {
            const response = await fetch(`/api/download?filename=${filename}`, {
                responseType: "blob", // Important for binary data
            });

            if (response.status !== 200) {
                throw new Error('Sorry, I could not find that file.');
              }
              const data = await response.blob();
            console.log("server response", data.type )
            // Extract filename from content-disposition header
            // const contentDisposition = response.headers["content-disposition"];
            // const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
            // const fileName = fileNameMatch ? fileNameMatch[1] : "downloadedFile";

            // Create a temporary anchor element to trigger the download
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement("a");
            link.href = url;
            // Setting filename received in response
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setDownloadStatus("Downloaded");
        } catch (error) {
            console.error("Error downloading file:", error);
            setDownloadStatus("Error downloading");
        }
    };

    return (
      
      <div className={styles.content}>
        <div className={styles.top}>
          <button onClick={()=>setShowUploadModal(!showUploadModal)} className={styles.addButton}>Upload file</button>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
           <thead>
            <tr>
             <td>Message</td>
             <td>date uploded</td>
             <td>file</td>
            </tr>
          </thead>
          <tbody>
             {filesUrlLoading && <tr>Loading  ...</tr>}
             {filesUrl?.map((course) => ( 
              <tr key={course.id} className={course.senderId===session?.user?.id?styles.receiver:styles.sender}>
              <td>{course.message}</td>
              <td>{moment(course.createdAt).calendar()}</td>
              <>
                {course.senderId===session?.user?.id?(
                  <td>{course.fileUrl}</td>
                ):( 
                <div className={styles.buttons}>
                  <button onClick={()=>downloadFavicon(course.fileUrl)}>{course.fileUrl}</button>
                </div>
                )}
              </>
            </tr>
           ))}
           </tbody>
        </table>
        </div>
        {showUploadModal && <UploadFileModal  onClose={() => setShowUploadModal(false)} chatId={userChats?._id} senderId={session?.user?.id} />}
        </div>               
    );
}