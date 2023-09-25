import React from "react";
import './Fixcustom.css';

function Fixcustom() {
  // const status = sessionStorage.getItem('status');
  const status = 'WAITING_FOR_INSPECTION';;

  // Define a function to determine the circle style based on the status
  const getCircleStyle = (circleStatus) => {
    if (status === circleStatus) {
      return { backgroundColor: '#F07B3F' };
    }
    return {};
  };

  // Define a function to determine whether to show the checkmark (✔)
  const showCheckmark = (circleStatus) => {
    return status === circleStatus ? "" : "";
  };

  return (
    <div className="roomimg resrecpage backgr">
      <div className="customreceivedivfix">
        <div className="custommodaltitle ">
          <p>점검 결과</p>
        </div>
        <div className="circlelinebox">

          <span>
            <div className="flexlinebox">
              <p className="circle" style={getCircleStyle("WAITING_FOR_INSPECTION")}>
                {showCheckmark("WAITING_FOR_INSPECTION")}
                <p className="listline">대기</p>
              </p>
            </div>
          </span>
          <p className="line"></p>
          <span>
            <div className="flexlinebox">
              <p className="circle" style={getCircleStyle("IN_PROGRESS")}>
                {showCheckmark("IN_PROGRESS")}
                <p className="listline">진행 중</p>
              </p>
            </div>
          </span>
          <p className="line"></p>
          <span>
            <div className="flexlinebox">
              <p className="circle" style={getCircleStyle("DONE")}>
                {showCheckmark("DONE")}
                <p className="listline">완료</p>
              </p>
            </div>
          </span>
        </div>
        <div className="middlemodalsx">
          <div className="boxpage">
            <p style={{ marginLeft: '5%' }}>담당자명 : 홍길동</p>
            <p style={{ marginLeft: '5%' }}>점검 완료 일시 : 2023-09-19</p>
            <p style={{ marginLeft: '5%' }}>보고서 다운로드 : 보고서 URL</p>
            <p style={{ marginLeft: '5%', marginTop: '-3%' }}>사진 파일 다운로드 : 사진파일.zip</p>
          </div>
        </div>
        <div className='middlemodal'>
          <button className="button bigbuttons">확인하기</button>
        </div>
      </div>
    </div>
  );
}

export default Fixcustom;
