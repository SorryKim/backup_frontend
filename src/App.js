import React, { useState } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import LoginPage from "./components/LoginPage";
import FileListPage from "./components/FileListPage";
import SignUpPage from "./components/SignUpPage";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f7f7f7;
`;

const CenteredView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (credentials) => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate replace to="/file" />
              ) : (
                <CenteredView>
                  <LoginPage onLogin={login} />
                </CenteredView>
              )
            }
          />
          <Route
            path="/files"
            element={
              isLoggedIn ? (
                <FileListPage onLogout={logout} />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
