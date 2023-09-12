import React,{useState} from 'react';
import './passbox.css';
function Mypassword() {

  return (
    <div className='passbox'>
      <div style={{marginLeft:'5%', color:'#2D4059', fontSize:'30px', fontWeight:'bold'}}>
        비밀번호 변경
        </div>

      <div>
        <input style={{paddingLeft:'10px', marginLeft: '5%',marginTop: '62px', boxShadow:'0px 3px 0px rgba(0, 0, 0, 0.3)',backgroundColor:'#ECF0F3',border:'none', color:'gray', borderRadius:'8px', width:'450px', height:'50px', fontSize:'25px', fontWeight:'bold'}} placeholder='현재 비밀번호'/>
        <p>
        <input style={{paddingLeft:'10px', marginLeft: '5%', marginTop:'69px', boxShadow:'0px 3px 0px rgba(0, 0, 0, 0.3)', backgroundColor:'#ECF0F3', border:'none', color:'gray', borderRadius:'8px', width:'450px', height:'50px', fontSize:'25px', fontWeight:'bold'}} placeholder='새 비밀번호'/>
        <input style={{paddingLeft:'10px', marginLeft: '5%',marginTop:'22px', boxShadow:'0px 3px 0px rgba(0, 0, 0, 0.3)', backgroundColor:'#ECF0F3', border:'none', color:'gray', borderRadius:'8px', width:'450px', height:'50px', fontSize:'25px', fontWeight:'bold'}} placeholder='새 비밀번호 확인'/>
        </p>
      </div>
    </div>
  )
}

export default Mypassword;