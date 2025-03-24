'use client'
import { useState } from 'react';
import Link from "next/link";
import styles from "@/app/ui/student/FileSharing.module.css"
import { ToastContainer, toast } from 'react-toastify';
import FadeLoader from "react-spinners/FadeLoader";
import { useSession } from "next-auth/react";


const UploadFile = ({onClose, title, chatId,senderId, setupdateFile}) => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState(null);
    const [disable, setdisable] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState('');

    const {data: session} = useSession()

    const handleCloseClick = (e) => {
        e.preventDefault();
    };
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    const handleTextChange = (e) => {
      console.log("let see", e.target.value)
      setText(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!file) return;

      console.log("disable did not work")
      const nt = {
        "id":'1',
        text: text
      }
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('text', text);
      formData.append('chatId', chatId);
      formData.append('senderId', senderId);


      console.log("form data", formData.get("file"))
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        setUploadedFileName(data.fileName);
        setupdateFile(true)
        // window.location.href = '/admin';
      } else {
        console.error('Upload failed');
      }
    };
    return (
      <>
        {chatId?(
          <>
            <form onSubmit={handleSubmit} className={styles.uploadSection}>
              <input type="file" accept=".doc,.docx" name='doc' onChange={handleFileChange} className={styles.fileInput} />
              <textarea placeholder="Message" className={styles.textareaStyle} name='textinput' row='10' onChange={handleTextChange}></textarea><button type="submit"  className={styles.uploadButton}>Send</button>
           </form>
          </>
          ):<><p>{session?.user?.role==='staff'?"You either did not select a student or the student didn't introduce himself":"You either didn't register for project or You didn't introduce yourself to your supervisor"}</p></>}
      </>
    );
  }

  export default UploadFile;