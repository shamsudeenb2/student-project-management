'use client'
import { useState } from 'react';
import Link from "next/link";
import styles from "@/app/ui/student/FileSharing.module.css"
import { ToastContainer, toast } from 'react-toastify';
import FadeLoader from "react-spinners/FadeLoader";


const UploadFile = ({onClose, title, chatId,senderId}) => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState('');

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
        // window.location.href = '/admin';
      } else {
        console.error('Upload failed');
      }
    };
    return (
    <form onSubmit={handleSubmit} className={styles.uploadSection}>
        <input type="file" accept=".doc,.docx" name='doc' onChange={handleFileChange} className={styles.fileInput} />
        <textarea placeholder="Message" className={styles.textareaStyle} name='textinput' row='10' onChange={handleTextChange}></textarea><button type="submit" className={styles.uploadButton}>Send</button>
    </form>
    );
  }

  export default UploadFile;