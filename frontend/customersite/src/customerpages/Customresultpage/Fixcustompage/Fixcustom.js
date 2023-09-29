import React from "react";
import './Fixcustom.css';
import { useMediaQuery } from "react-responsive";

function Fixcustom() {
  const status = 'IN_PROGRESS'; // 상태는 동적으로 설정하실 수 있습니다.

  // 상태에 따라 원 모양 스타일을 반환하는 함수 정의
  const getCircleStyle = (circleStatus) => {
    if (status === circleStatus) {
      return { backgroundColor: '#F07B3F' };
    }
    return {};
  };

  // 체크마크 (✔)를 표시할지 여부를 결정하는 함수 정의
  // const showCheckmark = (circleStatus) => {
  //   return status === circleStatus ? "✔" : "";
  // };

  // "대기 중", "진행 중", "완료" 상태에 따른 텍스트 및 다운로드 표시 여부 설정
  let boxPageText = "대기중입니다...";
  let additionalText = "";
  let showDownloadButtons = false;

  if (status === "IN_PROGRESS") {
    boxPageText = "담당자명 : 홍길동"; // 실제 담당자 이름으로 변경해주세요
    additionalText = "점검 시작일시 : 2023-09-19"; // 실제 시작일시로 변경해주세요
  } else if (status === "DONE") {
    boxPageText = "담당자명 : 홍길동"; // 실제 담당자 이름으로 변경해주세요
    additionalText = "점검 완료 일시 : 2023-09-19"; // 실제 완료 일시로 변경해주세요
    showDownloadButtons = true; // 완료 상태에서 다운로드 버튼을 표시합니다.
  }

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minDeviceWidth: 1224 });
    return isDesktop ? children : null;
  };
  
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxDeviceWidth: 1223 });
    return isMobile ? children : null;
  };

  return (
    <div className="roomimg resrecpage backgr">
      <Desktop>
        <div className="desk-customreceivedivfix">
          <div className="desk-custommodaltitle ">
            <p>점검 결과</p>
          </div>
          <div className="circlelinebox">
            <span>
              <div className="flexlinebox">
                <p className="desk-circle" style={getCircleStyle("WAITING_FOR_INSPECTION")}>
                  {/* {showCheckmark("WAITING_FOR_INSPECTION")} */}
                  <p className="desk-listline">대기</p>
                </p>
              </div>
            </span>
            <p className="desk-line"></p>
            <span>
              <div className="flexlinebox">
                <p className="desk-circle" style={getCircleStyle("IN_PROGRESS")}>
                  {/* {showCheckmark("IN_PROGRESS")} */}
                  <p className="desk-listline">진행 중</p>
                </p>
              </div>
            </span>
            <p className="desk-line"></p>
            <span>
              <div className="flexlinebox">
                <p className="desk-circle" style={getCircleStyle("DONE")}>
                  {/* {showCheckmark("DONE")} */}
                  <p className="desk-listline">완료</p>
                </p>
              </div>
            </span>
          </div>
          <div className="middlemodalsx">
            <div className="desk-boxpage">
            <div className="vertical-center">
              <p style={{ marginLeft: '5%' }}>{boxPageText}</p>
              <p style={{ marginLeft: '5%'}}>{additionalText}</p>
              {showDownloadButtons && (
                <>
                  <p style={{ marginLeft: '5%'}}>보고서 다운로드 : 보고서 URL</p>
                  <p style={{ marginLeft: '5%', marginTop: '-3%' }}>사진 파일 다운로드 : 사진파일.zip</p>
                </>
              )}
              </div>
            </div>
          </div>
          <div className='middlemodal'>
            <button className="button desk-bigbuttons">확인하기</button>
          </div>
        </div>
      </Desktop>
      <Mobile>
        <div className="customreceivedivfix">
          <div className="moblie-custommodaltitlefix ">
            <p>점검 결과</p>
          </div>
          <div className="circlelinebox">
            <span>
              <div className="flexlinebox">
                <p className="circle" style={getCircleStyle("WAITING_FOR_INSPECTION")}>
                  {/* {showCheckmark("WAITING_FOR_INSPECTION")} */}
                  <p className="listline">대기</p>
                </p>
              </div>
            </span>
            <p className="line"></p>
            <span>
              <div className="flexlinebox">
                <p className="circle" style={getCircleStyle("IN_PROGRESS")}>
                  {/* {showCheckmark("IN_PROGRESS")} */}
                  <p className="listline">진행 중</p>
                </p>
              </div>
            </span>
            <p className="line"></p>
            <span>
              <div className="flexlinebox">
                <p className="circle" style={getCircleStyle("DONE")}>
                  {/* {showCheckmark("DONE")} */}
                  <p className="listline">완료</p>
                </p>
              </div>
            </span>
          </div>
          <div className="middlemodalsx">
            <div className="boxpage">
              <div className="vertical-center">
              <p style={{ marginLeft: '5%'}}>{boxPageText}</p>
              <p style={{ marginLeft: '5%' }}>{additionalText}</p>
              {showDownloadButtons && (
                <>
                  <p style={{ marginLeft: '5%' }}>보고서 다운로드 : 보고서 URL</p>
                  <p style={{ marginLeft: '5%', marginTop: '-3%'}}>사진 파일 다운로드 : 사진파일.zip</p>
                </>
              )}
              </div>
            </div>
          </div>
          <div className='middlemodal'>
            <button className="button bigbuttons">확인하기</button>
          </div>
        </div>
      </Mobile>
    </div>
  );
}

export default Fixcustom;
