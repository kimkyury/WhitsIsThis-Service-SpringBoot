import React, { useState } from 'react';
import Menu from '../../component/Inmypage/Menu/Menu';
import Myinfo from '../../component/Inmypage/Myinfo/Myinfo';
import Mypassword from '../../component/Inmypage/Mypassword/Mypassword';
import pic from '../../component/Inmypage/Myinfo/pic.jpg';
import '../../component/Inmypage/Menu/Menu.css';
import './Mypage.css'
function Mypage() {
  const [selectedMenu, setSelectedMenu] = useState('내 정보'); // State 추가

  return (
    <div className='mypage'>
      <div>내 정보 페이지입니다.</div>
      <hr />
      <div style={{ display: 'flex', gap: '5%' }}>
        <div className='menu-container'>
          <div>
            <div style={{ marginTop: '20%', display: 'flex', justifyContent: 'center' }}>
              <img src={pic} style={{ display: 'flex', borderRadius: '100%', width: '10.5vw', height: '19vh' }} alt="사용자 사진"></img>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <p style={{ fontSize: '1.5vw', fontWeight: 'bold' }}>홍길동</p>
            </div>
          </div>
          <p 
            className={selectedMenu === '내 정보' ? 'selecte' : 'ptag'} 
            onClick={() => setSelectedMenu('내 정보')}
          >
            내 정보
          </p>
          <p 
            className={selectedMenu === '비밀번호 변경' ? 'selecte' : 'ptag'} 
            onClick={() => setSelectedMenu('비밀번호 변경')}
          >
            비밀번호 변경
          </p>
        </div>
          {selectedMenu === '내 정보' && <Myinfo />}
          {selectedMenu === '비밀번호 변경' && <Mypassword />}
      </div>
    </div>
  );
}

export default Mypage;
