'use client'
import { useState } from 'react';

const  UploadFile = () => {
  const [file, setFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      setUploadedFileName(data.fileName);
    } else {
      console.error('Upload failed');
    }
  };
  return (
    <div>
      <h1>Upload a Word Document</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".doc,.docx" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      {uploadedFileName && (
        <div>
          <h2>Uploaded File:</h2>
          <a href={`/uploads/${uploadedFileName}`} download>{uploadedFileName}</a>
        </div>
      )}
    </div>
  );
}

export default UploadFile