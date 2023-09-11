import React from 'react';
import './Header.css'
import { NavLink } from 'react-router-dom';
import logo from './logo.png'; // 로고 이미지 파일을 가져옵니다.

function Header(props) {
  return (
    <div>
      <div className="header">
        <img style={{ width: '90px' }} src={logo} alt='logo' /> {/* 로고 이미지를 표시합니다. */}
        <div style={{ display: 'flex',color: '#2D4059', justifyContent: 'flex-end' }}>
        <NavLink to={`/WebMain`} activeClassName="activeLink" exact>홈</NavLink>
        <NavLink to={`/WebMain/List`} className='item' activeClassName="activeLink">접수 목록</NavLink>
        <NavLink to={`/WebMain/ResultList`} className='item' activeClassName="activeLink">결과 목록</NavLink>
        <NavLink to={`/WebMain/Mypage`} className='item' activeClassName="activeLink">내 정보</NavLink>
          {/* <NavLink to={'/WebMain'} className='item'>로그인</NavLink> */}
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Header;
