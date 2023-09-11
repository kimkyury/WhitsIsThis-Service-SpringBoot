import React, {useState} from 'react';
import './Login.css';
function Login(props){
  return(
    <div>
      <div style={{display:'flex', borderRadius:'50px',width:'700px', height:'400px', backgroundColor:'whitesmoke', justifyContent:'center', alignItems:'center'}}>
        <form>
        <p style={{fontWeight:'bold',color:'#2D4059', textAlign: 'center', fontSize:'40px', marginTop:'5%', marginBottom:'2%' }}>로그인</p>
        <div>
        <div className='idbox'>
      <div style={{marginTop:'7%'}}>
      <div style={{fontSize:'25px',width:'600px', height:'51px',display:'flex', justifyContent:'space-between'}}>
        <label style={{fontWeight:'bold'}} for='Id'>아이디 :</label>
        <input style={{boxShadow:'0px 3px 3px rgba(0, 0, 0, 0.5)', border:'none', backgroundColor:'#ECF0F3', width:'400px', borderRadius:'8px'}} id='Id' placeholder='아이디를 입력해주십시오.' />
        </div>
      <div style={{marginTop:'10px', fontSize:'25px', width:'600px', height:'51px', display:'flex', justifyContent:'space-between'}}>
        <label style={{fontWeight:'bold'}} for='Password'>비밀번호 :</label>
        <input style={{boxShadow:'0px 3px 3px rgba(0, 0, 0, 0.5)', border:'none', backgroundColor:'#ECF0F3', width:'400px',borderRadius:'8px'}} id='Password' placeholder='비밀번호를 입력해주십시오.' />
    </div>
    </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom:'20px'}}>
            <button style={{ fontSize:'30px',width: '600px',height:'60px',alignSelf: 'center', textAlign: 'center', borderRadius:'20px',color:'white', backgroundColor:'#2D4059'}}>로그인</button>
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