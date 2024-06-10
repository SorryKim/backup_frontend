import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance"; // Axios 인스턴스를 import합니다.
import {
  LoginContainer,
  Title,
  Input,
  LoginButton,
  OrSeparator,
  BottomLinks,
} from "../styles/loginPage"; // 스타일을 styles.js 파일에서 import합니다.

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState(""); // 변수명을 email로 변경
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });
      if (response.status === 200) {
        const userData = response.data; // 여기서 userData는 응답의 데이터
        console.log("Logged in user data:", userData);
        onLogin(userData); // onLogin을 이용해 로그인 상태 관리
        navigate("/files", { state: { user: userData } }); // 사용자 정보를 navigate 함수의 상태로 전달
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("로그인 에러");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <LoginContainer>
      <Title>BT CLOUD</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton type="submit">로그인</LoginButton>
      </form>
      <OrSeparator>
        <span>또는</span>
      </OrSeparator>
      <LoginButton
        style={{ backgroundColor: "#42B72A" }}
        onClick={handleSignUp}
      >
        새 계정 만들기
      </LoginButton>
      <BottomLinks>
        <a href="/">계정을 잊으셨나요?</a>
        <a href="/">나중에 하기</a>
      </BottomLinks>
    </LoginContainer>
  );
}

export default LoginPage;
