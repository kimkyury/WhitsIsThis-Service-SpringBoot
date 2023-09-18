import React from "react";
import './Moneyreturn.css';
function Moneyreturn() {
  return (
    <div className="roomimg resrecpage">
    <div className="customreceivedivc">
    
    <div className="custommodaltitle ">
      <p>환불페이지</p>
    </div>
    <div className="middlemodals">
      <div>
      <p className="minititles">신청자명</p>
        <input style={{width:'42.5vw', height:'4.6vh'}} className="inputs" placeholder="이름을 입력해주십시오."/>
      <div className="customgrids">
      <p className="minititles">은행명</p>
      <p>계좌명</p>
      </div>
      <p className="minititles">가상계좌</p>
        <input style={{width:'42.5vw', height:'4.6vh'}} className="inputs" placeholder="계좌번호를 입력해주십시오."/>

      <p className="minititles">예상 환불금액</p>
      <p className="inputs" style={{textAlign:'end', paddingRight:'2%'}}>환불금액들어갈곳</p>

      </div>
      </div>
      <div className='middlemodal'>
        <button className="button bigbutton">환불신청</button>
      </div>
      </div>
  </div>
  )
}

export default Moneyreturn;