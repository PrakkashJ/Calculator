import React, { useState } from 'react';
import './FileInput.css';

const FileInput = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setStatus('File selected: ' + file.name);
    }
  };

  const handleCopyFile = async () => {
    if (!selectedFile) {
      setStatus('Please select a file first');
      return;
    }

    try {
      // Send the file path to the main process
      const result = await window.electron.copyFile(selectedFile.path);
      setStatus(result);
    } catch (error) {
      setStatus('Error: ' + error.message);
    }
  };

  return (
    <div className="file-input-container">
      <h2>File Copy Tool</h2>
      <div className="input-group">
        <input
          type="file"
          onChange={handleFileSelect}
          className="file-input"
        />
        <button 
          onClick={handleCopyFile}
          className="copy-button"
          disabled={!selectedFile}
        >
          Extract Frame
        </button>
      </div>
      <div className="status-message">{status}</div>
    </div>
  );
};

export default FileInput; 