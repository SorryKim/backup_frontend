import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FileList from './FileList';
import UploadContainer from './UploadContainer';
import AppBar from './AppBar';
import { PageContainer, Sidebar, ContentArea } from '../styles/fileList';
import axiosInstance from '../axiosInstance';

const FileListPage = ({ onLogout }) => {
  const location = useLocation();
  const user = location.state?.user || {};

  const [refreshFileList, setRefreshFileList] = useState(false);
  const [allFiles, setAllFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [fileType, setFileType] = useState('전체');

  useEffect(() => {
    fetchFiles();
  }, [refreshFileList]);

  useEffect(() => {
    filterFiles();
  }, [allFiles, fileType]);

  const fetchFiles = async () => {
    try {
      const response = await axiosInstance.get('/file/list');
      if (Array.isArray(response.data)) {
        const files = response.data.map((file) => ({
          key: file.key,
          name: file.key,
          size: file.size,
          lastModified: new Date(file.lastModified).toLocaleDateString('en-US'),
          storageClass: file.storageClass,
          type: getFileType(file.key),
        }));
        setAllFiles(files);
        setFilteredFiles(files); // 초기에는 모든 파일을 보여줌
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
      return '사진';
    } else if (['mp4', 'avi', 'mov'].includes(extension)) {
      return '동영상';
    } else if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'iso', 'yaml'].includes(extension)) {
      return '파일';
    } else {
      return '기타';
    }
  };

  const filterFiles = () => {
    if (fileType === '전체') {
      setFilteredFiles(allFiles);
    } else {
      setFilteredFiles(allFiles.filter(file => file.type === fileType));
    }
  };

  const handleFileTypeChange = (type) => {
    setFileType(type);
  };

  const onUploadSuccess = () => {
    setRefreshFileList(!refreshFileList);
  };

  const onFileDelete = () => {
    setRefreshFileList(!refreshFileList);
  };

  return (
    <PageContainer>
      <AppBar user={user} onLogout={onLogout} />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar>
          <p onClick={() => handleFileTypeChange('전체')}>전체</p>
          <p onClick={() => handleFileTypeChange('사진')}>사진</p>
          <p onClick={() => handleFileTypeChange('동영상')}>동영상</p>
          <p onClick={() => handleFileTypeChange('파일')}>파일</p>
        </Sidebar>
        <ContentArea>
          <FileList files={filteredFiles} onFileDelete={onFileDelete} />
          <UploadContainer onUploadSuccess={onUploadSuccess} />
        </ContentArea>
      </div>
    </PageContainer>
  );
};

export default FileListPage;
