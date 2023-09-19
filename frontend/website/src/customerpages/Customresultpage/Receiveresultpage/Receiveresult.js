import React from "react";
import './Receiveresult.css';
// import Calendar from "../../../component/calendar/calendar";
function Receiveresult() {
  return (
    <div className="roomimg resrecpage">
      <div className="customreceivedivs">
      
      <div className="custommodaltitle ">
        <p>신청 결과</p>
      </div>
      <div className="middlemodals">
        <div>

        <div className="customgrids">
        <p className="recrestitle">은행명 :</p>
        <p>계좌명</p>
        </div>

        <p className="recrestitle">가상계좌 :</p>
        <p>가상계좌들어갈곳</p>

        </div>
        </div>
      <div className="middlebox">
        <button className="button middlebutton">확인</button>
        <button className="button middlebutton">신청취소</button>
        </div>
        </div>
    </div>

  )
}
// 계좌에 따라서 가상계좌 나옴 => 계좌 바꿀때마다 get요청
// (후순위)신청취소를 누르면 => 환불페이지 => 환불신청을 할때 
// => post하면서 계좌조회 api get요청 확인 후 잘못되었습니다. 환불요청이 접수되었습니다. or 환불이 되었습니다.
export default Receiveresult;