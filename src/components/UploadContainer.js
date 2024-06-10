import React, { useState } from "react";
import {UploadWrapper,UploadInput, UploadButton, ProgressBar, Progress, UploadMessage
} from "../styles/uploadContainer";
import axios from "axios";

function UploadContainer({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadError, setUploadError] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadMessage("Please select a file to upload.");
      setUploadError(true);
      return;
    }

    const totalChunks = Math.ceil(selectedFile.size / CHUNK_SIZE);
    const uploadChunk = async (chunk, index) => {
      const formData = new FormData();
      formData.append("file", chunk);
      formData.append("chunkIndex", index);
      formData.append("totalChunks", totalChunks);
      formData.append("fileName", selectedFile.name);

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/file/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setUploadProgress((prevProgress) => prevProgress + (progress / totalChunks));
          },
          timeout: 600000
        });
        return response;
      } catch (error) {
        console.error(`Error uploading chunk ${index}:`, error.response ? error.response.data : error.message);
        throw new Error(`Error uploading chunk ${index}: ${error.response ? error.response.data.message : error.message}`);
      }
    };

    try {
      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, selectedFile.size);
        const chunk = selectedFile.slice(start, end);
        await uploadChunk(chunk, i);
      }
      setUploadMessage("File uploaded successfully.");
      setUploadError(false);
      setUploadProgress(100);
      onUploadSuccess("File uploaded successfully.");
    } catch (error) {
      setUploadMessage("Error uploading file: " + error.message);
      setUploadError(true);
      setUploadProgress(0);
      console.error(error);
    }
  };

  return (
    <UploadWrapper>  
      <UploadInput type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <UploadButton onClick={handleFileUpload}>Upload File</UploadButton>
      <UploadMessage error={uploadError}>{uploadMessage}</UploadMessage>
      업로드 진행률
      <ProgressBar>
        <Progress progress={uploadProgress} />
      </ProgressBar>
    </UploadWrapper>
  );
}

export default UploadContainer;
