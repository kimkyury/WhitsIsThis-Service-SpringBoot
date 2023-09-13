import React, {useState} from 'react';
import './Login.css';
function Login(props){
  return(
    <div>
      <div className='LoginForm'>
        <form>
        <p className='LoginTag'>로그인</p>
        <div>
        <div className='idbox'>
      <div>

      <div className='IDPASS'>

        <label style={{marginTop:'5vh', fontSize:'1.6vw'}}>아이디 : </label>
        <input style={{marginTop:'5vh'}} className='IdPassTag' id='Id' placeholder='아이디' />
        </div>
      <div className='IDPASS'>
        <label style={{marginTop:'2vh', fontSize:'1.6vw'}}>비밀번호 : </label>
        <input style={{marginTop:'2vh'}} className='IdPassTag' id='Password' placeholder='비밀번호' />
    </div>
    </div>
        <div className='LoginButtonDiv'>
            <button className='LoginButton'>로그인</button>
          </div>
      </div>
        </div>
        {/* <p className='IdPassFind'>아이디/비밀번호 찾기</p> */}
        </form>
      </div>
      </div>
  );
}

export default Login;
//#ECF0F3