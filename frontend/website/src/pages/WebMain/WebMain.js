import React from 'react';
import Login from '../../component/Login/Login';
import './login.css'
import FirstLogin from '../../component/Login/firstLogin';
function WebMain() {
  return (
    <div>
      <div className='loginform'>
      {/* <Login/> */}
      <FirstLogin/>
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