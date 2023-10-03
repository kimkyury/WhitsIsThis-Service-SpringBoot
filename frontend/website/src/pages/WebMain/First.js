import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트를 가져옵니다.
import Login from '../../component/Login/Login';
import FirstLogin from '../../component/Login/firstLogin';
import './login.css';

function First() {
  // 최초 로그인 여부를 로컬 스토리지에서 가져옵니다.


  // 상태 변수를 사용하여 현재 로그인 상태를 관리합니다.
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 만약 최초 로그인이 아니라면 로그인 상태를 설정합니다.
  // useEffect(() => {
  //   if (!isFirstLogin) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // 로그아웃 핸들러 함수
  // const handleLogout = () => {
  //   // 로컬 스토리지에서 로그인 정보 제거
  //   localStorage.removeItem('isFirstLogin');
  //   // 로그인 상태를 false로 설정
  //   setIsLoggedIn(false);
  // };

  // 최초 로그인 여부에 따라 컴포넌트를 렌더링합니다.
  return (
    <div className='centerFirst fontb'>
      {/* <div className='loginform'> */}
 
          
       
     
          <FirstLogin/>

      {/* </div> */}
    </div>
  );
}

export default First;
