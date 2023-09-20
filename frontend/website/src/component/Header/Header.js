import React, { useState } from 'react';
import './Header.css'
import { NavLink } from 'react-router-dom';
 // 로고 이미지 파일을 가져옵니다.

function Header(props) {
  const [activeLink, setActiveLink] = useState('');

  const linkStyle = {
    color: '#2D4059', // 비활성 링크의 텍스트 색상
    marginRight: '3%',
    display: 'inline-block', // 수정: display를 inline-block으로 변경
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <div>
      <div className="header">
        <img style={{ width: '9vw', height:'8vh' }} src={`${process.env.PUBLIC_URL}/images/logo.png`} alt='logo' /> {/* 로고 이미지를 표시합니다. */}
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
        </div>
      </div>
    </div>
  );
}

export default Header;