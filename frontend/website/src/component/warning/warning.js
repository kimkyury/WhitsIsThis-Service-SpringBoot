import React from "react";
import { CiWarning } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import './warning.css'
function Warning() {
  const navigate = useNavigate();
  return (
    <div style={{width:'30rem', height:'19rem', marginLeft:'17vw', marginTop:'2vh', border: '3px solid #F07B3F', borderRadius:'8px'}}>
    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', justifyContent:'center'}}>
      <CiWarning style={{fontSize:'15rem', color:'#F07B3F'}}/>
      <div style={{display:'flex', alignItems:'center',justifyContent:'center' }}>
      <p style={{display:'flex', justifyContent:'center', textAlign:'center'}}>로그인이 필요한 페이지 입니다.<br/>로그인을 시도해주세요</p>
      
      </div>
      </div>

     </div>
     <div style={{marginBottom:'2vh', display:'flex', justifyContent:'center'}}>
     <button className='warnbutton'  onClick={() => navigate('/')}>로그인 하러가기</button>
     </div>
    </div>
  )
}

export default Warning;