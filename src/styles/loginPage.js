import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  margin-top: 100px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
`;

export const Title = styled.h1`
  color: #444;
  margin-bottom: 25px;
`;

export const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`;

export const LoginButton = styled.button`
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: none;
  background-color: #1877F2;
  color: white;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #165EAB;
  }
`;

export const OrSeparator = styled.div`
  width: 100%;
  border-bottom: 1px solid #ddd;
  line-height: 0.1em;
  margin: 20px 0;

  & > span {
    background: #fff;
    padding: 0 10px;
    color: #bbb;
  }
`;

export const BottomLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > a {
    color: #1877F2;
    text-decoration: none;
    margin: 5px;
    font-size: 14px;
  }
`;
