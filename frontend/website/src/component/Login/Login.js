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
      <div style={{marginLeft: '2.3%', marginTop:'5%'}}>


        <input style={{boxShadow:'0px 3px 2px rgba(0, 0, 0, 0.5)', border:'none', backgroundColor:'white', width:'600px', height:'60px', borderRadius:'4px', fontSize:'25px', paddingLeft:'20px'}} id='Id' placeholder='아이디' />

      {/* <div style={{marginTop:'10px', fontSize:'25px', width:'600px', height:'51px', display:'flex', justifyContent:'space-between'}}> */}
  
        <input style={{marginTop:'2%', boxShadow:'0px 3px 2px rgba(0, 0, 0, 0.5)', border:'none', backgroundColor:'white', width:'600px', height:'60px',borderRadius:'4px', fontSize:'25px', paddingLeft:'20px'}} id='Password' placeholder='비밀번호' />
    {/* </div> */}
    </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom:'20px'}}>
            <button style={{ fontSize:'30px',width: '600px',height:'60px',alignSelf: 'center', textAlign: 'center', borderRadius:'8px',color:'white', backgroundColor:'#2D4059'}}>로그인</button>
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