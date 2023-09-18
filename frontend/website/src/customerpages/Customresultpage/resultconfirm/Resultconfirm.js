import React from "react";
import './Resultconfirm.css';

function Resultconfirm() {
  return (
    <div className="roomimg resrecpage">
      <div className="customreceivedivs">
      
      <div className="custommodaltitle ">
        <p>결과확인</p>
      </div>
      <div className="middlemodalsx">
      <div className="customgrid">
        <input className="input cinput" placeholder="연락처를 입력해주십시오."/>
        <button className="button minibutton" style={{marginLeft:'3%'}}>인증하기</button>
        </div>
        </div>
        <div className='middlemodal'>
        <button className="button bigbutton">확인하기</button>
      </div>
        </div>
    </div>
  )
}

export default Resultconfirm;