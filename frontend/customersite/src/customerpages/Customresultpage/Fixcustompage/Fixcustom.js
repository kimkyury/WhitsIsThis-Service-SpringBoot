import React from "react";
import './Fixcustom.css';
function Fixcustom() {
  
  return (
    <div className="roomimg resrecpage backgr">
    <div className="customreceivedivfix">
    
    <div className="custommodaltitle ">
      <p>점검 결과</p>
    </div>
    <div style={{marginTop:'5%', display: 'flex', alignItems: 'center', justifyContent:'center' }}>
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
        {/* <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', height:'30%'}}> */}
          <p style={{marginLeft:'5%'}}>담당자명 : 홍길동</p>
          <p style={{marginLeft:'5%'}}>점검 완료 일시 : 2023-09-19</p>
        {/* </div> */}
        <p style={{marginLeft:'5%'}}>보고서 다운로드 : 보고서 URL</p>
        <p style={{marginLeft:'5%', marginTop:'-3%'}}>사진 파일 다운로드 : 사진파일.zip</p>
      </div>
      </div>
      <div className='middlemodal'>
      <button className="button bigbuttons">확인하기</button>
    </div>
      </div>
  </div>
  )
}
// 비동기적으로 결과확인을 할때마다 정보 갱신 waiting인지 start인지 finish인지 
// 확인하고 해당하는 칸 주황색과 ✔ 중앙
// 점검완료 시 boxpage 아래 담당자명/점검 완료 일시/보고서 다운로드/사진 파일 다운로드 등의 정보를 가져옴
export default Fixcustom;