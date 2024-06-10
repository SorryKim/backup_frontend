// ../styles/fileList.js
import styled from "styled-components";

export const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  padding: 16px;
  margin: auto;
`;

export const FileItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const FileImage = styled.img`
  max-width: 100px;
  height: auto;
`;

export const FileName = styled.p`
  margin: 1rem 0 0;
  font-size: 0.9rem;
  text-align: center;
`;

export const FileSize = styled.div`
  font-size: 14px;
  color: #666;
  margin-right: 20px;
`;

export const FileModifiedDate = styled.div`
  font-size: 14px;
  color: #666;
  margin-left: 20px;
`;

export const StorageClassLabel = styled.div`
  color: #000;
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 8px;
  font-size: 0.8em;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 8px;
`;

export const DownloadButton = styled.button`
  padding: 4px 8px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  font-size: 12px;

  &:hover {
    background-color: darkblue;
  }
`;

export const DeleteButton = styled.button`
  padding: 4px 8px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  font-size: 12px;

  &:hover {
    background-color: darkred;
  }
`;

export const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Sidebar = styled.div`
  flex: 0 0 15%;
  background-color: #f1f1f1;
  padding: 10px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  p {
    margin: 10px 0;
    padding: 10px;
    cursor: pointer;

    &:hover {
      background-color: #ddd;
    }
  }
`;

export const ContentArea = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

export const LogoutButton = styled.button`
  background-color: red;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;

export const RestoreButton = styled.button`
  background-color: #ffc107;
  padding: 4px 8px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  font-size: 12px;
  &:hover {
    background-color: #e0a800;
  }
`;
