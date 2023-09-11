import React from 'react';
import Menu from '../../component/Inmypage/Menu/Menu';
import Myinfo from '../../component/Inmypage/Myinfo/Myinfo';
// import {Link} from'react-router-dom';


function Mypage() {
  return (
    <div>내 정보 페이지입니다.
      <hr/>
    <div style={{display:'flex', gap:'5%'}}>
    <Menu/>

    <Myinfo/>
    </div>
    </div>
  )
}

export default Mypage;