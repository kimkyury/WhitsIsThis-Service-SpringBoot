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
        <button className="button middlebutton">다음</button>
        <button className="button middlebutton">신청취소</button>
        </div>
        </div>
    </div>

  )
}

export default Receiveresult;