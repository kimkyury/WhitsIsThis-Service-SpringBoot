import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const BASE_NAME = process.env.REACT_APP_BASE_NAME || "";
  const handleLogin = async (e) => {
    e.preventDefault(); // 폼 기본 제출 동작 방지

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/employees/login`,
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        // 성공적인 로그인 시 API가 토큰을 반환한다고 가정합니다
        const userData = response.data.data.employeeinfo;

        // 컴포넌트 상태에 사용자 데이터를 저장하지 않고 sessionStorage에만 저장합니다
        sessionStorage.setItem("username", userData.username);
        sessionStorage.setItem("imageurl", userData.imageUrl);
        sessionStorage.setItem("role", userData.role);
        sessionStorage.setItem("phone", userData.phone);
        sessionStorage.setItem("name", userData.name);
        sessionStorage.setItem("isinit", response.data.data.isInitLoginUser);
        // sessionStorage.setItem('Token', Cookies.get('refreshToken'));
        sessionStorage.setItem("status", response.data.status);
        sessionStorage.setItem("accessToken", response.data.data.accessToken);
        sessionStorage.setItem("password", password);
        // 성공적인 로그인 후 목록 페이지로 리다이렉트합니다
        setAuthenticated(true);
        if (response.data.data.isInitLoginUser === 1) {
          // isinit이 0이면 "First" 페이지로 이동
          window.location.href = BASE_NAME + "/first";
        } else if (response.data.data.isInitLoginUser === 0) {
          // isinit이 1이면 "List" 페이지로 이동
          window.location.href = BASE_NAME + "/list";
        }
        console.log("로그인 성공");
      } else {
        // 상태 코드가 200이 아닌 경우에는 오류 메시지를 표시합니다.
        setMessage("로그인 실패. 자격 정보를 확인해주세요.");
      }
    } catch (error) {
      // 로그인 오류를 처리합니다
      setMessage("로그인 실패. 자격 정보를 확인해주세요.");
    }
  };

  // const makeApiRequest = async () => {
  //   const refreshToken = sessionStorage.getItem('refreshToken')
  //   const BASE_URL = process.env.REACT_APP_BASE_URL
  //   try {
  //     const response = await axios.get(`${BASE_URL}/api/v1/auth/reissue`, {
  //       headers: {
  //         'Authorization': `${refreshToken}`
  //       },
  //     });

  //     // API 요청 성공
  //     return response.data;
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       // 토큰이 만료되면 401 상태 코드를 받음

  //       // 토큰 재발급 요청
  //       const reissueResponse = await axios.post('api/v1/auth/reissue', {
  //         refreshToken: sessionStorage.getItem('refreshToken'),
  //       });

  //       // 새로운 액세스 토큰을 받음
  //       const newAccessToken = reissueResponse.data.accessToken;

  //       // 받은 액세스 토큰을 저장
  //       sessionStorage.setItem('accessToken', newAccessToken);

  //       // 이전 요청 재시도
  //       const retryResponse = await axios.get(`${BASE_URL}/api/v1/auth/reissue`, {
  //         headers: {
  //           'Authorization': `Bearer ${newAccessToken}`
  //         },
  //       });

  //       return retryResponse.data;
  //     } else {
  //       // 다른 오류 처리
  //       throw error;
  //     }
  //   }
  // };
  return (
    <div className="LoginForm fontb">
      <div className="fontb">
        <h2 className="LoginTag">로그인</h2>
        <form onSubmit={handleLogin}>
          <div className="idbox">
            <div>
              <input
                type="text"
                placeholder="아이디"
                value={username}
                className="IdPassTag"
                style={{ marginTop: "0vh" }}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                className="IdPassTag"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="LoginButtonDiv">
            <button className="LoginButton fontb" type="submit">
              로그인
            </button>
          </div>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Login;
