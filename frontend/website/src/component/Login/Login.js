import React, {useState} from 'react';
import './Login.css';
function Login(props){
  return(
    <div>
      <div style={{display:'flex', borderRadius:'50px',width:'1000px', height:'600px', backgroundColor:'whitesmoke', justifyContent:'center', alignItems:'center'}}>
        <form>
        <p style={{fontWeight:'bold',color:'#2D4059', textAlign: 'center', fontSize:'50px', marginTop:'5%', marginBottom:'2%' }}>로그인</p>
        <div>
        <div className='idbox'>
      <div style={{marginTop:'10%'}}>

      <div style={{marginTop:'10px', fontSize:'25px', width:'762px', height:'51px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>

        <label style={{fontSize:'30px'}}>아이디 : </label>
        <input style={{boxShadow:'0px 3px 0px rgba(0, 0, 0, 0.3)', border:'none', backgroundColor:'#ECF0F3', width:'569px', height:'51px', borderRadius:'8px', fontSize:'25px', paddingLeft:'20px'}} id='Id' placeholder='아이디' />
        </div>
      <div style={{marginTop:'10px', fontSize:'25px', width:'762px', height:'51px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <label style={{marginTop:'35px', fontSize:'30px'}}>비밀번호 : </label>
        <input style={{marginTop:'35px', boxShadow:'0px 3px 0px rgba(0, 0, 0, 0.3)', border:'none', backgroundColor:'#ECF0F3', width:'569px', height:'51px',borderRadius:'8px', fontSize:'25px', paddingLeft:'20px'}} id='Password' placeholder='비밀번호' />
    </div>
    </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom:'20px'}}>
            <button style={{ fontSize:'40px',width: '762px',height:'100px',alignSelf: 'center', textAlign: 'center', borderRadius:'8px',color:'white', backgroundColor:'#2D4059'}}>로그인</button>
          </div>
      </div>
        </div>
        <p style={{display:'flex', justifyContent:'flex-end', marginBottom:'30px', marginTop:'2%', fontWeight:'bold'}}>아이디/비밀번호 찾기</p>
        </form>
      </div>
      </div>
  );
}

export default Login;
//#ECF0F3