import React from 'react';
import {
  ListContainer,
  FileItem,
  FileImage,
  FileName,
  FileSize,
  FileModifiedDate,
  DeleteButton,
  DownloadButton,
  RestoreButton,
  ButtonContainer,
  StorageClassLabel,
} from '../styles/fileList';
import axiosInstance from '../axiosInstance'; // axiosInstance를 import

const fileTypeIcons = {
  '.jpg': 'https://via.placeholder.com/100x100?text=JPG',
  '.png': 'https://via.placeholder.com/100x100?text=PNG',
  '.pdf': 'https://via.placeholder.com/100x100?text=PDF',
  '.doc': 'https://via.placeholder.com/100x100?text=DOC',
  '.docx': 'https://via.placeholder.com/100x100?text=DOCX',
  '.xls': 'https://via.placeholder.com/100x100?text=XLS',
  '.xlsx': 'https://via.placeholder.com/100x100?text=XLSX',
  '.txt': 'https://via.placeholder.com/100x100?text=TXT',
  '.iso': 'https://via.placeholder.com/100x100?text=ISO',
  '.yaml': 'https://via.placeholder.com/100x100?text=YAML',
  '.default': 'https://via.placeholder.com/100x100?text=FILE',
};

function FileList({ files, onFileDelete }) {
  const getFileTypeIcon = (fileName) => {
    const extension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
    return fileTypeIcons[extension] || fileTypeIcons['.default'];
  };

  const handleFileDownload = async (file) => {
    try {
      const response = await axiosInstance.get(`/file/download/${encodeURIComponent(file.key)}`, {
        responseType: 'blob',
      });
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', file.key);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleFileDelete = async (fileKey) => {
    if (window.confirm(`"${fileKey}" 파일을 삭제하시겠습니까?`)) {
      try {
        await axiosInstance.delete(`/file/delete/${encodeURIComponent(fileKey)}`);
        alert('파일이 삭제되었습니다.');
        onFileDelete(); // 파일 삭제 후 콜백 함수 호출
      } catch (error) {
        console.error('Error deleting file:', error);
        alert('파일 삭제에 실패했습니다.');
      }
    }
  };

  const handleRestoreRequest = async (fileKey) => {
    if (window.confirm(`"${fileKey}" 파일을 복원 요청하시겠습니까?`)) {
      try {
        await axiosInstance.post(`/file/restore/${encodeURIComponent(fileKey)}`);
        alert('파일 복원 요청이 성공적으로 접수되었습니다.');
      } catch (error) {
        console.error('Error restoring file:', error);
        alert('파일 복원 요청에 실패했습니다.');
      }
    }
  };

  return (
    <ListContainer>
      {files.length > 0 ? (
        files.map((file) => (
          <FileItem key={file.key}>
            <FileImage src={getFileTypeIcon(file.key)} alt={file.key} />
            <FileName>{file.key}</FileName>
            <FileSize>파일 크기: {file.size} bytes</FileSize>
            <FileModifiedDate>수정 날짜: {file.lastModified}</FileModifiedDate>
            <StorageClassLabel>현재 S3티어: {file.storageClass}</StorageClassLabel>
            <ButtonContainer>
              {file.storageClass.startsWith('GLACIER') ? (
                <RestoreButton onClick={() => handleRestoreRequest(file.key)}>복원 요청</RestoreButton>
              ) : (
                <DownloadButton onClick={() => handleFileDownload(file)}>다운로드</DownloadButton>
              )}
              <DeleteButton onClick={() => handleFileDelete(file.key)}>삭제</DeleteButton>
            </ButtonContainer>
          </FileItem>
        ))
      ) : (
        <div>No files found</div>
      )}
    </ListContainer>
  );
}

export default FileList;