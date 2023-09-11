import React,{useState} from 'react';
import pic from '../Myinfo/pic.jpg';
import './Menu.css';
function Menu() {
  
  return (
    <div className='Menu'>
      <div style={{marginTop:'20%', display:'flex', justifyContent:'center'}}>
      <img src={pic} style={{display:'flex', border:'solid 2px black', borderRadius:'100%', width:'150px', height:'150px'}}></img>
      </div>
      <p className='ptag'>내 정보</p>
      <p className='ptag'>비밀번호 변경</p>

    </div>
  )
}

export default Menu;