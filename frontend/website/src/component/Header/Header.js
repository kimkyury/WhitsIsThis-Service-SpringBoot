import React, { useState } from 'react';
import './Header.css'
import { NavLink } from 'react-router-dom';
import axios from 'axios'; // axios 라이브러리를 가져옵니다.

function Header(props) {
  const [activeLink, setActiveLink] = useState('');
  const BASE_URL = process.env.REACT_APP_BASE_URL
  const linkStyle = {
    color: '#2D4059', // 비활성 링크의 텍스트 색상
    marginRight: '3%',
    display: 'inline-block', // 수정: display를 inline-block으로 변경
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      // 로그아웃 요청을 서버에 보냅니다.
      await axios.post(`${BASE_URL}/api/v1/private/auth/logout`);

      // 로그아웃 성공 시 로컬 스토리지에서 토큰 제거 및 페이지 새로고침
      localStorage.removeItem('token');
      window.location.reload();
    } catch (error) {
      console.error('로그아웃 에러:', error);
    }
  };

  return (
    <div>
      <div className="header">
        <img style={{ width: '9vw', height:'8vh' }} src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt='logo' /> {/* 로고 이미지를 표시합니다. */}
        <div style={{ display: 'flex', width: '28vw',height:'3.3vh', marginRight: '3%' }}>
          <NavLink
            to={`/`}
            exact
            style={activeLink === '홈' ? { ...linkStyle, color: 'orange' } : linkStyle}
            onClick={() => handleLinkClick('홈')}
          >
            홈
          </NavLink>
          <NavLink
            to={`/list`}
            className='item'
            style={activeLink === '접수 목록' ? { ...linkStyle,               
            color: '#F07B3F', 
            height:'4vh',
            borderBottom: '3px solid #F07B3F',
            fontWeight: 'bold' } : linkStyle}
            onClick={() => handleLinkClick('접수 목록')}
          >
            접수 목록
          </NavLink>
          <NavLink
            to={`/resultList`}
            className='item'
            style={activeLink === '결과 목록' ? { ...linkStyle,               
            color: '#F07B3F', 
            borderBottom: '3px solid #F07B3F',
            height:'4vh',
            fontWeight: 'bold'} : linkStyle}
            onClick={() => handleLinkClick('결과 목록')}
          >
            결과 목록
          </NavLink>
          <NavLink
            to={`/mypage`}
            className='item'
            style={activeLink === '내 정보' ? { ...linkStyle,               
            color: '#F07B3F',
            height:'4vh',
            borderBottom: '3px solid #F07B3F',
            fontWeight: 'bold' } : linkStyle}
            onClick={() => handleLinkClick('내 정보')}
          >
            내 정보
          </NavLink>
          {/* 로그아웃 버튼 */}
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
