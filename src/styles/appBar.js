// ../styles/appBar.js
import styled from 'styled-components';

export const AppBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  background-color: #fae100;
  color: black;
  padding: 10px 20px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  span {
    margin: 0;
  }
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
