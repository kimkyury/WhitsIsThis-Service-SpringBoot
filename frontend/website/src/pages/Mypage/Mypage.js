import React from 'react';
import Menu from '../../component/Inmypage/Menu/Menu';
import Myinfo from '../../component/Inmypage/Myinfo/Myinfo';

function Mypage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
      <div>내 정보 페이지입니다.</div>
      <hr />
      <div style={{ display: 'flex', gap: '5%' }}>
        <Menu />
        <Myinfo />
      </div>
    </div>
  );
}

export default Mypage;
