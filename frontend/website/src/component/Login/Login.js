import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  // 토큰을 상태로 관리
  const [token, setToken] = useState('');

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    // 컴포넌트가 마운트될 때 localStorage에서 토큰을 가져옵니다.
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(BASE_URL + `/api/v1/auth/employees/login`, {
        password: password,
        username: username,
      });

      if (response.status === 200) {
        setMessage('로그인 성공');
        const authToken = response.data.token;

        // 토큰을 상태로 저장
        setToken(authToken);

        // 로컬 스토리지에도 토큰 저장 (옵션)
        localStorage.setItem('authToken', authToken);

        // 페이지 이동
        navigate('/list');

        // 로그인 성공 시 토큰 검사와 갱신 로직 추가
        checkAndRefreshToken(authToken);

      } else {
        setMessage('로그인 실패');
      }
    } catch (error) {
      if (error.response) {
        // 서버로부터 에러 응답이 도착한 경우
        console.error('에러 응답:', error.response.status, error.response.data);
      } else {
        // 요청 자체에 문제가 있는 경우
        console.error('요청 에러:', error.message);
      }
    }
  };

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 토큰 가져오기 (옵션)
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      // 로컬 스토리지에서 토큰을 가져와서 상태로 저장
      setToken(storedToken);
    }
  }, []);

  // 토큰 유효성 검사와 재발급 로직을 추가합니다.
  const checkAndRefreshToken = async (authToken) => {
    try {
      // 서버에 토큰 검사 요청 보내기
      const response = await axios.post(BASE_URL + `/api/v1/auth/check-token`, {
        token: authToken,
      });

      if (response.status === 200) {
        // 토큰이 유효한 경우 아무 작업 필요 없음
      } else if (response.status === 401) {
        // 토큰이 만료된 경우 서버로부터 새로운 토큰 요청
        const refreshTokenResponse = await axios.post(BASE_URL + `/api/v1/auth/refresh-token`, {
          token: authToken,
        });

        if (refreshTokenResponse.status === 200) {
          const newAuthToken = refreshTokenResponse.data.token;

          // 새로운 토큰으로 상태 및 로컬 스토리지 업데이트
          setToken(newAuthToken);
          localStorage.setItem('authToken', newAuthToken);

          // 여기에서 필요한 작업 수행 (예: 갱신된 토큰으로 다시 API 호출)
        } else {
          // 토큰 갱신 실패 시 로그아웃 또는 다른 조치 수행
        }
      }
    } catch (error) {
      console.error('토큰 검사 및 갱신 에러:', error.message);
    }
  };

  return (
    <div className='LoginForm'>
      <div>
        <h2 className='LoginTag'>로그인</h2>
        <div className='idbox'>
          <div>
            <input
              type="username"
              placeholder="아이디"
              value={username}
              className='IdPassTag'
              style={{ marginTop: '0vh' }}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              className='IdPassTag'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className='LoginButtonDiv'>
          <button className='LoginButton' onClick={handleLogin}>
            로그인
          </button>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
