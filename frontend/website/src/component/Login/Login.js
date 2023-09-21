import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // 스타일 파일을 가져옵니다.

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      // 로그인 요청을 보내는 Axios 코드
      const response = await axios.post('/api/v1/auth/employees/login', {
        username,
        password,
      });

      // 서버 응답 확인
      if (response.status === 200) {
        // 로그인 성공
        setMessage('로그인 성공');
        console.log('로그인 성공')
        // 여기에서 로그인 후의 동작을 수행하세요. 예: 페이지 이동 등
        // history.push('./list')
      } else {
        // 로그인 실패
        setMessage('로그인 실패');
        console.log('로그인 실패')
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      setMessage('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className='LoginForm'>
      <form>
        <h2 className='LoginTag'>로그인</h2>
        <div className='idbox'>
          <div >
            <input
              type="username"
              placeholder="아이디"
              value={username}
              className='IdPassTag'
              style={{marginTop:'0vh'}}
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
          <button className='LoginButton' onClick={handleLogin}>로그인</button>
          <p>{message}</p>
        </div>
      </form>
    </div>
  );
}

export default Login;
