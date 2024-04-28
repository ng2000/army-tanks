import React, { useState } from 'react';
import axios from 'axios';

export default function FileUploadImport() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('upload?path=/path/to/destination', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadStatus(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file.');
    }
  };

  return (
    <div style={{minHeight:'475px'}}>
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2 style={{ marginBottom: '20px' }}>File Upload</h2>
      <form onSubmit={handleFormSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Upload</button>
      </form>
      {uploadStatus && <p style={{ marginTop: '20px' }}>{uploadStatus}</p>}
    </div>
    </div>
  );
}