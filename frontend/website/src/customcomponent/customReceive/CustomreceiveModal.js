import React from "react";
import './CustomreceiveModal.css'
import Calendar from "../../component/calendar/calendar";
function CustomreceiveModal() {
  return (
    <div className="customreceivediv">
      <div className="custommodaltitle">
        <p>신청하기</p>
      </div>
      <div className="middlemodal">
      <div>
        <p className="minititle">신청자명</p>
        <input style={{width:'70vw', height:'4.6vh'}} className="input" placeholder="이름을 입력해주십시오."/>
        <p className="minititle">요청 사항</p>
        <input className="input" style={{width:'70vw', height:'8.1vh'}} placeholder="요청 사항을 입력해주십시오."/>
        <p className="minititle">연락처</p>
        <div className="customgrid">
        <input className="input cinput" placeholder="연락처를 입력해주십시오."/>
        <button className="button minibutton">인증하기</button>
        </div>
        <p className="minititle" style={{width:'33.4vw', height:'4.6vh'}}>비밀번호</p>
        <input style={{width:'70vw', height:'4.6vh'}}  className="input" placeholder="비밀번호를 입력해주십시오."/>

        <p className="minititle">위임장 사진</p>
        <div style={{display:'flex', justifyContent:'flex-end'}}>
        <button className="button minibutton" >찾아보기</button>
        </div>
        <p className="minititle" style={{width:'33.4vw', height:'4.6vh'}}>주소</p>
        <div className="customgrid">
        <input className="input cinput" placeholder="주소을 입력해주십시오."/>
        <button className="button minibutton">주소찾기</button>
        </div>
        <p className="minititle">상세주소</p>
        <input style={{width:'70vw', height:'4.6vh'}}  className="input" placeholder="상세 주소를 입력해주십시오.(동 호수 포함)"/>
        <div className="customgridx">
        <p className="minititle">점검 예정 일자 :</p>
        <Calendar/>
        </div>
      </div>
      </div>
      <div className='middlemodal'>
        <button className="button bigbutton">신청하기</button>
      </div>
    </div>
  )
}

export default CustomreceiveModal;