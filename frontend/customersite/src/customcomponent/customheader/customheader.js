import React, { useState } from 'react';
import './Header.css'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
// import Logout from '../Login/Logout';
function Header(props) {
  const [activeLink, setActiveLink] = useState('');
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const linkStyle = {
    color: 'black',
    marginRight: '3%',
    display: 'inline-block',
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  // 로그아웃 함수



  return (
    <div className='fontb'>
      <div className="header">
        <img style={{ marginLeft:'5vw',marginTop:'1vh', width: '9vw'}} src={`${process.env.PUBLIC_URL}/assets/로고사진누.png`} alt='logo' /> {/* 로고 이미지를 표시합니다. */}
        <div className='items'>
          {/* <NavLink
            to={`/`}
            style={activeLink === '홈' ? { ...linkStyle, color: 'orange' } : linkStyle}
            onClick={() => handleLinkClick('홈')}
          >
            홈
          </NavLink> */}
          <NavLink
            to={`/`}
            className='item'
            style={activeLink === '접수 목록' ? { ...linkStyle,               
            color: '#F07B3F', 
            height:'2rem',
            width:'5.2rem',
            borderBottom: '2px solid #F07B3F',
            fontWeight: 'bold' } : linkStyle}
            onClick={() => handleLinkClick('접수 목록')}
          >
            소개
          </NavLink>
          <NavLink
            to={`/customerreceive`}
            className='item'
            style={activeLink === '결과 목록' ? { ...linkStyle,               
            color: '#F07B3F', 
            borderBottom: '2px solid #F07B3F',
            height:'2rem',
            width:'5.2rem',
            fontWeight: 'bold'} : linkStyle}
            onClick={() => handleLinkClick('결과 목록')}
          >
            신청 하기
          </NavLink>
          <NavLink
            to={`/resultconfirm`}
            className='item'
            style={activeLink === '결과 목록' ? { ...linkStyle,               
            color: '#F07B3F', 
            borderBottom: '2px solid #F07B3F',
            height:'2rem',
            width:'5.2rem',
            fontWeight: 'bold'} : linkStyle}
            onClick={() => handleLinkClick('결과 목록')}
          >
            결과 확인
          </NavLink>
          {/* <NavLink
            to={`resultconfirm`}
            className='minitem'
            style={activeLink === '내 정보' ? { ...linkStyle,               
            color: '#F07B3F',
            height:'2rem',
            width:'4rem',
            borderBottom: '2px solid #F07B3F',
            fontWeight: 'bold' } : linkStyle}
            onClick={() => handleLinkClick('내 정보')}
          >
            결과확인
          </NavLink> */}
          {/* 로그아웃 버튼 */}
         
          {/* <button onClick={handleLogout}>로그아웃</button> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
