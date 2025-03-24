'use client';
import {useState, useEffect, useCallback} from "react"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import moment from "moment";
import UploadFile from "@/app/component/UploadFile";
import styles from './FileSharing.module.css';
import { ToastContainer, toast } from 'react-toastify';
import FadeLoader from "react-spinners/FadeLoader";

export default function FileSharing() {
  // const q = searchParams?.q || "";
  // const page = searchParams?.page || 1;
  const {data: session} = useSession()
  const router = useRouter() 
  const [downloadStatus, setDownloadStatus] = useState("");

  const [filesUrl, setFilesUrl] = useState([])
  const [filesUrlLoading, setLoadingFilesUrl] = useState(false)
  const [filesUrlError, setFilesUrlError] = useState(null)
  const [userChats, setUserChats] = useState([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [userChatsLoading, setIsUserChatsLoading] = useState(false)

  const [projectStudent, setprojectStudent] = useState([])
    const [projectStudentLoading, setLoadingprojectStudent] = useState(false)
    const [projectStudentError, setprojectStudentError] = useState(null)
    const [selectId, setSelectId] = useState("1");
    const [updateFile, setupdateFile] = useState("1");

useEffect(()=>{
  const getChats= async()=>{
      setIsUserChatsLoading(true)
      const response = await fetch(`/api/charts/findChat?lectuerId=${session?.user.id}&studentId=${selectId}&role=${session?.user.role}`)
      setIsUserChatsLoading(false)
      
      if(response.error){
          console.log("error response", response)
      }
      if(response.ok){
          const data = await response.json();
          console.log("user chart", data?.chat[0])
          setUserChats(data?.chat[0])
      }
  }

getChats()
}, [selectId])

useEffect(()=>{
  const getfilesUrl= async()=>{
      setLoadingFilesUrl(true)
      setFilesUrlError(null)
          const response = await fetch(`/api/upload?id=${userChats?._id}`) //
          setLoadingFilesUrl(false)

          if(response.error){
              return setFilesUrlError(response.error)
          }
          const data = await response.json();
          console.log("file urls", data)
          setFilesUrl(data.fileUrls)
          
  }
  getfilesUrl()
},[userChats,updateFile])

useEffect(()=>{
  const getprojectStudent= async()=>{
      setLoadingprojectStudent(true)
      setprojectStudentError(null)
      const response = await fetch(`http://localhost:3000//api/courses/view-student?id=${session?.user?.id}`)
          setLoadingprojectStudent(false)
      if(response.error){
          return setprojectStudentError(response.error)
      }
      const data = await response.json();
      console.log("project student", data?.users)
      setprojectStudent(data?.users)
  }
  getprojectStudent()
},[])
const handleSearch = (e) => {
      
  if (e.target.value) {
  //   const selected = JSON.parse(e.target.value);
    console.log('selected', e.target.value)
    setSelectId(e.target.value);
  } ;
};

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
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Integrative Communication Platform for supervisor and Supervisee Interaction</h1>
        <p>Send, receive, and manage your files efficiently.</p>
      </header>
       <main className={styles.main}>
          <div className={styles.formDiv}>
           <UploadFile chatId={userChats?._id} senderId={session?.user?.id} setupdateFile={setupdateFile}/>
          </div>
          <div className={styles.selectStudent}>
            {session?.user?.role==="staff"?(
              <>
                {projectStudentLoading && <tr>Loading  ...</tr>}
                <select  className={styles.select} id="course" onChange={handleSearch}>
                  <option value="">Select Student</option>
                {projectStudent?.map((course) => {
                  return (
                    <option key={course._id} value={course._id}>{course.name}</option>
                  );
                })}
              </select>
            </>):<></>}
          </div>
        <div className={styles.fileLists}>
          <div className={styles.fileSection}>
            <h2>Sent Files</h2>
            <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
               <tr>
                 <td>Message</td>
                 <td>date uploded</td>
                 <td>Uploaded Files Name</td>
               </tr>
              </thead>
              <tbody>
                {filesUrlLoading && <tr>Loading  ...</tr>}
                {filesUrl?.map((course) => ( 
                  <tr key={course._id} className={course.senderId===session?.user?.id?styles.receiver:styles.sender}>
                     <>
                       {course.senderId===session?.user?.id?(
                        <>
                          <td>{course.message}</td>
                          <td>{moment(course.createdAt).calendar()}</td>
                          <td>{course.fileUrl}</td>
                        </>
                        ):( <></>)}
                     </>
                   </tr>
                 ))}
              </tbody>
             </table>
            </div>
           </div>
          <div className={styles.fileSection}>
            <h2>Received Files</h2>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <td>Message</td>
                    <td>Date Uploded</td>
                    <td>Download File</td>
                  </tr>
               </thead>
          <tbody>
             {filesUrlLoading && <tr>Loading  ...</tr>}
             {filesUrl?.map((course) => ( 
              
              <>
                {course.senderId===session?.user?.id?(
                  <></>
                ):(
                  <tr key={course._id} className={course.senderId===session?.user?.id?styles.receiver:styles.sender}>
                    <td>{course.message}</td>
                    <td>{moment(course.createdAt).calendar()}</td>
                    <span className={styles.buttons}>
                      <button onClick={()=>downloadFavicon(course.fileUrl)}>{course.fileUrl}</button>
                    </span>
                  </tr>
                )}
              </>
           ))}
           </tbody>
        </table>
        </div>
          </div>
        </div>
      </main>
    </div>
  );
}
