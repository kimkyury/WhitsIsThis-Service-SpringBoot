import React, { useState } from 'react';
import Menu from '../../component/Inmypage/Menu/Menu';
import Myinfo from '../../component/Inmypage/Myinfo/Myinfo';
import Mypassword from '../../component/Inmypage/Mypassword/Mypassword';
import pic from '../../component/Inmypage/Myinfo/pic.jpg';
import '../../component/Inmypage/Menu/Menu.css';
import './Mypage.css';

function Mypage() {
  const [selectedMenu, setSelectedMenu] = useState('내 정보');
  const circleStyle = {
    width: '100px',  // 원의 지름을 조절할 수 있습니다.
    height: '100px', // 원의 지름을 조절할 수 있습니다.
    borderRadius: '50%', // 이 부분이 원 모양을 만듭니다.
    overflow: 'hidden', // 원 밖의 부분은 잘립니다.
  };

  const imageStyle = {
    width: '100%', // 이미지가 원 안에 꽉 차도록 설정합니다.
    height: '100%', // 이미지가 원 안에 꽉 차도록 설정합니다.
    objectFit: 'cover', // 이미지의 크기를 조절하여 원 안에 맞게 합니다.
  };

  return (
    <div className='mypage'>
      <div style={{ display: 'flex', gap: '5%', width: '50vw' }}>
        <div className='menu-container' style={{width:'15vw', position: 'fixed', top: '25vh' }}>
          <div>
            <div style={{ marginTop: '20%', display: 'flex', justifyContent: 'center', circleStyle }}>
              <img
                src={pic}
                style={{
                  display: 'fixed',
                  position: 'sticky',
                  display: 'flex',
                  borderRadius: '100%',
                  width: '10vw',
                  height: '10vw',
                  imageStyle // 이미지의 크기를 조정합니다.
                }}
                alt="사용자 사진"
              />
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
        <div style={{ position:'fixed', top:'25vh', left:'15vw', marginLeft: '30%' }}> {/* 내용을 표시할 영역 */}
          {selectedMenu === '내 정보' && <Myinfo />}
          {selectedMenu === '비밀번호 변경' && <Mypassword />}
        </div>
      </div>
    </div>
  );
}

export default Mypage;
