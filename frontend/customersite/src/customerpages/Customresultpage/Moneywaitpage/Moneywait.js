import React from "react";
import './Moneywait.css';
function Moneywait() {
  return (
    <div className="roomimg resrecpage" >
    <div className="customreceivedivwait">
    
    <div className="custommodaltitle ">
      <p>입금 대기</p>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
  <span>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p className="circle"><p className="listline">대기</p></p>
    </div>
  </span>
  <p className="lines"></p>
  <span>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p className="circle"><p className="listline">완료</p></p>
    </div>
  </span>
</div>
    <div className="middlemodalsx">
      <div className="boxpagemoney">
        <p style={{marginLeft:'5%'}}>✔ 입금이 완료되었습니다.<br/>
          감사합니다.</p>
      </div>
      </div>
      <div className='middlemodal'>
      <button className="button bigbutton" style={{marginTop:'2%'}}>확인하기</button>
    </div>
      </div>
  </div>
  )
}

export default Moneywait;