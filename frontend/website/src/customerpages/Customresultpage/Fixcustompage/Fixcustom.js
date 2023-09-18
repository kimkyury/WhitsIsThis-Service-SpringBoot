import React from "react";
import './Fixcustom.css';
function Fixcustom() {
  
  return (
    <div className="roomimg resrecpage">
    <div className="customreceivedivfix">
    
    <div className="custommodaltitle ">
      <p>점검 결과</p>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
  <span>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p className="circle"><p className="listline">대기</p></p>
    </div>
  </span>
  <p className="line"></p>
  <span>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p className="circle"><p className="listline">진행 중</p></p>
    </div>
  </span>
  <p className="line"></p>
  <span>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p className="circle"><p className="listline">완료</p></p>
    </div>
  </span>
</div>
    <div className="middlemodalsx">
      <div className="boxpage">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', height:'30%'}}>
          <span style={{marginLeft:'5%'}}>담당자명 : 홍길동</span>
          <span style={{marginRight:'5%'}}>점검 완료 일시 : 2023-09-19</span>
        </div>
        <p style={{marginLeft:'5%'}}>보고서 다운로드 : 보고서 URL</p>
        <p style={{marginLeft:'5%'}}>사진 파일 다운로드 : 사진파일.zip</p>
      </div>
      </div>
      <div className='middlemodal'>
      <button className="button bigbutton">확인하기</button>
    </div>
      </div>
  </div>
  )
}

export default Fixcustom;