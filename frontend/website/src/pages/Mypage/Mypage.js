import React, { useState, useEffect } from 'react';
import Menu from '../../component/Inmypage/Menu/Menu';
import Myinfo from '../../component/Inmypage/Myinfo/Myinfo';
import Mypassword from '../../component/Inmypage/Mypassword/Mypassword';
import pic from '../../component/Inmypage/Myinfo/pic.jpg';
import '../../component/Inmypage/Menu/Menu.css';
import './Mypage.css';
import Warning from '../../component/warning/warning';

function Mypage() {
  const [selectedMenu, setSelectedMenu] = useState('내 정보');
  const consumer = sessionStorage.getItem('name');
  const imgurl = sessionStorage.getItem('imageurl');
  const [isLogin, setIsLogin] = useState(false);
  const accessToken = sessionStorage.getItem('accessToken')
  useEffect(() => {
  if (accessToken) {

    console.log(accessToken)
    setIsLogin(true)
    }
    if (!isLogin) {
      // navigate(-1)
    }})
  return (
    isLogin?(
    <div className='mypage'>
      <div style={{ display: 'flex', gap: '5%', width: '50vw' }}>
        <div className='menu-container'>
          {/* <div>
            <div className='mypagemenuimgbox'>
              <img
                src={imgurl}
                className='mypimgbox'
                alt="사용자 사진"
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <p style={{ fontSize: '1.5vw', fontWeight: 'bold' }}>{consumer}</p>
            </div>
          </div> */}
          {/* <p
            className={selectedMenu === '내 정보' ? 'selecte' : 'ptag'}
            onClick={() => setSelectedMenu('내 정보')}
          >
            내 정보
          </p> */}
          {/* <p
            className={selectedMenu === '비밀번호 변경' ? 'selecte' : 'ptag'}
            onClick={() => setSelectedMenu('비밀번호 변경')}
          >
            비밀번호 변경
          </p> */}
        </div>
        <div  className='menufix'> {/* 내용을 표시할 영역 */}
          {selectedMenu === '내 정보' && <Myinfo />}
          {selectedMenu === '비밀번호 변경' && <Mypassword />}
        </div>
      </div>
    </div>):(
      <div style={{display:'flex',justifyContent:'center', alignItems:'center', height:'90vh'}}>
        <Warning/>
      </div>
    )
  );
}

export default Mypage;
