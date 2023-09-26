import React from "react";
import './CustomreceiveModal.css'
function Phoneconfirm() {
  return (
    <div>  
      <div className="customreceivedivconfirms">
      <div className="customgrid">
            <input
              className="input cinput"
              placeholder="인증번호를 입력해주십시오."
            />
            <button className="button minibutton">인증하기</button>
    </div>
    </div>
    </div>
  )
}

export default Phoneconfirm;