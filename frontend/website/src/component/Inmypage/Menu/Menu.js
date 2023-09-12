import React,{useState} from 'react';
import pic from '../Myinfo/pic.jpg';
import './Menu.css';
function Menu() {
  const user = '홍길동';
  return (
    <div className='Menu'>
      <div>
      <div style={{marginTop:'20%', display:'flex', justifyContent:'center'}}>
      <img src={pic} style={{display:'flex', borderRadius:'100%', width:'200px', height:'200px'}}></img>
      </div>
      <div style={{display:'flex', justifyContent:'center'}}>
      <p style={{fontSize:'30px', fontWeight:'bold'}}>{user}</p>
      </div>
      </div>
      <p className='ptag'>내 정보</p>
      <p className='ptag'>비밀번호 변경</p>

    </div>
  )
}

export default Menu;