import styled from "styled-components";

export const UploadWrapper = styled.div`
  margin-top: 2rem;
  border: 2px solid #ccc; /* 경계선 추가, 색상은 회색 */
  padding: 1rem; /* 내용물과 경계선 사이의 여백 추가 */
  border-radius: 8px; /* 경계선 모서리를 둥글게 설정 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 추가로 입체감 부여 */
`;

export const UploadInput = styled.input`
  margin-right: 1rem;
`;

export const UploadButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;


export const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #f3f3f3;
  border-radius: 4px;
  margin-top: 1rem;
`;

export const Progress = styled.div`
  height: 100%;
  background-color: #4caf50;
  border-radius: 4px;
  width: ${(props) => props.progress}%;
  transition: width 0.5s ease;
`;

export const UploadMessage = styled.div`
  margin-top: 1rem;
  color: ${(props) => (props.error ? "red" : "green")};
`;
