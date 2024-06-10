// AppBar.js
import React from "react";
import { AppBarContainer, UserInfo, LogoutButton } from "../styles/appBar";

const AppBar = ({ user, onLogout }) => (
  <AppBarContainer>
    <h1>BT CLOUD</h1>
    <UserInfo>
      <span>{user.name}</span>
      <span>{user.email}</span>
    </UserInfo>
    <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
  </AppBarContainer>
);

export default AppBar;
