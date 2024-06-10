import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance"; // axiosInstance를 import
import '../styles/SignUpPage.css'; // CSS 파일 import

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/user", formData);
      console.log("회원가입 성공:", response.data);
      navigate("/files"); // 성공 시 파일 페이지로 이동
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 실패: " + (error.response?.data.message || error.message));
    }
  };

  const handleCancel = () => {
    navigate("/"); // 홈으로 이동
  };

  return (
    <div className="sign-up-container">
      <h1 className="title">회원가입</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="이름"
          className="input"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="이메일"
          className="input"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          className="input"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="button button-primary" type="submit">가입하기</button>
        <button className="button button-secondary" onClick={handleCancel}>취소</button>
      </form>
    </div>
  );
}

export default SignUpPage;
