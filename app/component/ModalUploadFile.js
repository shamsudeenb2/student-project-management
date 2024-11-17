'use client'
import { useState } from 'react';
import Link from "next/link";
import styles from "@/app/ui/student/studentFiles.module.css"


const UploadFileModal = ({onClose, title, chatId,senderId}) => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
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


      console.log("form data", nt)
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        setUploadedFileName(data.fileName);
        onClose();
        // window.location.href = '/admin';
      } else {
        console.error('Upload failed');
      }
    };
    return (
        <div className={styles.modalOverlay}>
            {/* Wrap the whole Modal inside the newly created StyledModalWrapper
            and use the ref */}
            <div className={styles.modalWrapper}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <a href="#" onClick={handleCloseClick}>
                            x
                        </a>
                    </div>
                    {title && <h1>{title}</h1>}
                    <div className={styles.modalBody}>
                      <form onSubmit={handleSubmit} className={styles.formStyle}>
                        <input type="file" accept=".doc,.docx" name='doc' onChange={handleFileChange} />
                        <textarea className={styles.textareaStyle} name='textinput' row='10' onChange={handleTextChange}></textarea>
                         <button type="submit">Upload</button>
                      </form>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  export default UploadFileModal;