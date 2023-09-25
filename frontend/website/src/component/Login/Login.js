import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault(); // 폼 기본 제출 동작 방지

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/employees/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        // 성공적인 로그인 시 API가 토큰을 반환한다고 가정합니다
        const userData = response.data.data.employeeinfo;

        // 컴포넌트 상태에 사용자 데이터를 저장하지 않고 sessionStorage에만 저장합니다
        sessionStorage.setItem('username', userData.username);
        sessionStorage.setItem('imageurl', userData.imageUrl);
        sessionStorage.setItem('role', userData.role);
        sessionStorage.setItem('phone', userData.phone);
        sessionStorage.setItem('name', userData.name);
        sessionStorage.setItem('isinit', response.data.data.isInitLoginUser);
        // sessionStorage.setItem('Token', Cookies.get('refreshToken'));
        sessionStorage.setItem('status', response.data.status);
        sessionStorage.setItem('refreshToken', response.data.data.accessToken);
        // 성공적인 로그인 후 목록 페이지로 리다이렉트합니다
        setAuthenticated(true);
        navigate('/list');
        console.log('로그인 성공')
      } else {
        // 상태 코드가 200이 아닌 경우에는 오류 메시지를 표시합니다.
        setMessage('로그인 실패. 자격 정보를 확인해주세요.');
      }
    } catch (error) {
      // 로그인 오류를 처리합니다
      setMessage('로그인 실패. 자격 정보를 확인해주세요.');
    }
  };

  return (
    <div className="LoginForm">
      <div>
        <h2 className="LoginTag">로그인</h2>
        <form onSubmit={handleLogin}>
          <div className="idbox">
            <div>
              <input
                type="text"
                placeholder="아이디"
                value={username}
                className="IdPassTag"
                style={{ marginTop: '0vh' }}
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
            <button className="LoginButton" type="submit">
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
