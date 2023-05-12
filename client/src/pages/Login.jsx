import React, { useState } from "react";
import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import AuthInput from "../components/AuthInput.jsx";
// import axios from "axios";
import google from "../assets/images/icon_sns_google.svg";
import kakao from "../assets/images/icon_sns_kakao.svg";
import naver from "../assets/images/icon_sns_naver.svg";

export default function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [loginAlert, setLoginAlert] = useState("");
  const [loginFailed, setLoginFailed] = useState("");
  // 이메일 핸들러
  const onEmailHandler = event => {
    setEmail(event.currentTarget.value);
  };
  // 비밀번호 핸들러
  const onPasswordHandler = event => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = event => {
    // 버튼만 누르면 리로드 되는것을 막아줌
    event.preventDefault();

    //빈값일 경우 에러창뜨게하기
    setLoginAlert(
      email === "" && password === "" && "아이디 또는 비밀번호를 입력해주세요"
    );
    if (email === "" || password === "") return;

    //로그인 처리
    // axios
    //   .post(
    //     '넘겨받은 주소',
    //     {
    //       email,
    //       password,
    //     }
    //   )
    //   .then((res) => {
    //     localStorage.setItem('access_token', res.headers.authorization);
    //     localStorage.setItem('refresh_token', res.headers.refresh);
    //     setLoginFailed('');
    //     navigate('/home');
    //   })
    //   .catch(() => {
    //     setLoginFailed('login-failed');
    //   });
  };
  return (
    <PageContainer>
      <LoginWrap>
        <h2>Log in</h2>
        <form onSubmit={onSubmitHandler}>
          <AuthInput type="email" id="email" placeholder="이메일" />
          <AuthInput
            type="password"
            id="password"
            placeholder="비밀번호"
            alertMessage={loginAlert}
          />
          <PasswordFinder>비밀번호를 잊으셨나요?</PasswordFinder>
          <ButtonGroup>
            <button type="submit">로그인</button>
            {/* 로그인 실패시 뜨게할 창 */}
            {/* <p className={loginFailed}>Login failed</p> */}
          </ButtonGroup>
        </form>
        <AuthButton>
          <div className="line">SNS 계정으로 로그인</div>
          <form>
            <img src={google} alt="googleLogo" />
            <img src={kakao} alt="kakaoLogo" />
            <img src={naver} alt="naverLogo" />
          </form>
          <div>
            아직 회원이 아니신가요? <span>회원가입</span>
          </div>
        </AuthButton>
      </LoginWrap>
    </PageContainer>
  );
}

const LoginWrap = styled.div`
  max-width: 445px;
  width: 100%;
  margin: 0 auto;
`;

const PasswordFinder = styled.div`
  text-align: right;
  text-decoration: underline;
  color: ${({ theme }) => theme.color.gray100};
  font-size: 0.875em;
  margin: 10px 0px;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  button {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 9px;
    background-color: ${({ theme }) => theme.color.whiteOp50};
    color: ${({ theme }) => theme.color.black};
    border: 1px solid black;
    cursor: pointer;
    margin-bottom: 50px;
  }
`;

const AuthButton = styled.div`
  .line {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    font-size: 0.875rem;
    margin: 8px 0px;
    color: ${({ theme }) => theme.color.black};
    margin-bottom: 30px;
  }
  .line::before {
    content: "";
    flex-grow: 1;
    margin: 0px 16px;
    background: ${props => props.theme.color.black};
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }
  .line::after {
    content: "";
    flex-grow: 1;
    margin: 0px 16px;
    background: ${props => props.theme.color.black};
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }
  form {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 50px;
  }

  img {
    padding: 0px 20px;
  }

  div {
    white-space: normal;
    font-size: 0.875em;
    text-align: center;
    color: ${({ theme }) => theme.color.gray100};
  }

  span {
    text-decoration: underline;
    color: ${({ theme }) => theme.color.black};
    cursor: pointer;
  }
`;
