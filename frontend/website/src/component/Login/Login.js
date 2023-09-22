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


  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/employees/login`, {
        username: username,
        password: password,
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
      } else {
        setMessage('로그인 실패');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      setMessage('로그인 중 오류가 발생했습니다.');
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

  // ... (토큰 관련 코드 등)

  return (
    <div className='LoginForm'>
      {/* <form> */}
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
      {/* </form> */}
    </div>
  );
}

export default Login;
