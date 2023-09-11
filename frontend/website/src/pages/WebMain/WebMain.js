import React from 'react';
import Login from '../../component/Login/Login';
function WebMain() {
  return (
    <div>로그인페이지 프라이빗
      <div style={{display:'flex', justifyContent:'center', alignItems: 'center', // 세로 중앙 정렬
      height: '90vh'}}>
      <Login/>
      </div>
    </div>
  )
}

export default WebMain;

// const handleCardUpload = async () => {
//   setName(document.getElementById('name').value);
//   setSubTitle(document.getElementById('sub_Title').value);
//   setPoint(selectedStars);

{/* <form style={{ display: 'flex', flexDirection: 'column'}}
onSubmit={onSubmitHandler}
>
<label>Email</label>
<input type='email' value={Email} onChange={onEmailHandler}/>
<label>Password</label>
<input type='password' value={Password} onChange={onPasswordHandler}/>
<br />
<button formAction=''>
    Login
</button>
</form> */}