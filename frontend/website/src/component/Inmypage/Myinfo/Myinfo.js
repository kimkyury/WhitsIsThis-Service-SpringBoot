import React, { useState } from 'react';
import picture from './pic.jpg';
import './info.css';
import Updatemodal from '../Updatedpage/Updatedpage';

function Myinfo() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const consumer = '홍길동';
  const Pnumber = '010-0000-0000';
  const id = 'qwer1234';
  const number = '1234567';

  return (
    <div className='InfomMy'>
      <p className='Myinform'>내 정보</p>
      <div className='gridboxss' 
>
        <img className='imgbox' 
        style={{ 
          position: 'sticky', 
          objectFit:'cover', 
          marginBottom:'40%'
          }}
          src={picture} 
          alt="프로필 사진" 
          />
        <div 
        style={{
          display:'flex', 
          alignItems:'center'
          }} 
          >
          <div 
          style={{
            display:'grid', 
            gridTemplateRows:'1fr 1fr'
            }}>
          <p className='updatebox'>
            <span>{consumer}</span>
            {/* <button
              onClick={() => setIsModalVisible(true)} // 모달 열기
              className='UpdateBtn'
            >
              실명수정
            </button> */}
          </p>
          <p className='updatebox' style={{marginTop:'-20%'}}>
            <span style={{marginBottom:'20%'}}>{Pnumber}</span>
            {/* <button
              className='UpdateBtn'
              >
              수정
            </button> */}
          </p>
              </div>
        </div>
      </div>

      <div>
        <p className='Myinform'>기본정보</p>
        <div style={{ marginLeft: '10%', borderRadius: '0.42vw', border: '0.15vw solid black', width: '31vw', height: '12.5vh' }}>
          <div style={{ marginLeft: '5%', marginRight: '5%', marginTop:'-2%' }}>
            <p className='updatebox'>
              <span>{id}</span>
              {/* <button
                className='UpdateBtn'
              >
                수정
              </button> */}
            </p>
          </div>
          <div className='updatebox' style={{marginLeft:'5%', marginTop:'-3%'}}>
            <span>사번 : {number}</span>
            <span style={{ marginRight: '5%' }}>역할 : 직원</span>
          </div>
        </div>
      </div>

      {/* 모달을 조건부로 렌더링 */}
      {isModalVisible && <Updatemodal onClose={() => setIsModalVisible(false)} />}
    </div>
  );
}

export default Myinfo;
