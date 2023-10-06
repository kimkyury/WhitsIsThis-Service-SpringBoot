import React, { useState } from "react";
// import "./Fixcustom.css";

import { useMediaQuery } from "react-responsive";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Fixcustom() {
  // const navigate = useNavigate();
  // const location = useLocation();

  // const BASE_URL = process.env.REACT_APP_BASE_URL;

  // const { id, status, employeeName, inspectionDate, history, payment } = location.state;
  // const statuses = ["WAITING_INSPECTION_DATE", "WAITING_FOR_INSPECTION", "IN_PROGRESS", "DONE"];

  // const getIndex = (status) => {
  //   return statuses.indexOf(status);
  // };

  // // 상태에 따라 원 모양 스타일을 반환하는 함수 정의
  // const getCircleStyle = (circleStatus) => {
  //   const statusIdx = getIndex(status);
  //   const circleStatusIdx = getIndex(circleStatus);

  //   if (circleStatusIdx < statusIdx) return { backgroundColor: "#006400", color: "green" };
  //   if (circleStatusIdx === statusIdx) {
  //     return { backgroundColor: "#F07B3F", color: "green" };
  //   }
  //   return {};
  // };

  // // 체크마크 (✔)를 표시할지 여부를 결정하는 함수 정의
  // const showCheckmark = (circleStatus) => {
  //   const statusIdx = getIndex(status);
  //   const circleStatusIdx = getIndex(circleStatus);

  //   if (circleStatusIdx < statusIdx) return "✔";
  //   if (circleStatusIdx === statusIdx) {
  //     return ">";
  //   }
  //   return "";
  // };

  // // "대기 중", "진행 중", "완료" 상태에 따른 텍스트 및 다운로드 표시 여부 설정
  // let boxPageText = "담당자와 점검 일자를 할당 중입니다.";
  // let additionalText = "빠른 시일 내로 결정됩니다.";
  // let showCancelButton = true;
  // let showDownloadButtons = false;

  // if (status === "WAITING_FOR_INSPECTION") {
  //   boxPageText = `담당자명 : ${employeeName}`;
  //   additionalText = `점검 시작일시 : ${inspectionDate}`;
  // }
  // if (status === "IN_PROGRESS") {
  //   boxPageText = `담당자명 : ${employeeName}`; // 실제 담당자 이름으로 변경해주세요
  //   additionalText = `점검을 진행 중입니다.`; // 실제 시작일시로 변경해주세요
  //   showCancelButton = false;
  // } else if (status === "DONE") {
  //   boxPageText = `담당자명 : ${employeeName}`; // 실제 담당자 이름으로 변경해주세요
  //   additionalText = `점검 완료일시 : ${history.inspectedAt}`; // 실제 완료 일시로 변경해주세요
  //   showCancelButton = false;
  //   showDownloadButtons = true; // 완료 상태에서 다운로드 버튼을 표시합니다.
  // }

  // const handleCancellation = async () => {
  //   if (!window.confirm("신청을 취소하시겠습니까?")) return;

  //   navigate("/moneyreturn", { state: { payment: payment } });
  // };

  // const handleOk = () => {
  //   navigate("/", { replace: true });
  // };

  // const handleReportDownload = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/api/v1/histories/${history.id}/report`, {
  //       responseType: "blob",
  //     });

  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "report.pdf");
  //     document.body.appendChild(link);
  //     link.click();
  //   } catch (error) {
  //     alert("파일이 존재하지 않습니다.");
  //     console.error("Error downloading the file:", error);
  //   }
  // };

  // const handleZipDownload = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/api/v1/histories/${history.id}/zip`, {
  //       responseType: "blob",
  //     });

  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "zip.zip");
  //     document.body.appendChild(link);
  //     link.click();
  //   } catch (error) {
  //     alert("파일이 존재하지 않습니다.");
  //     console.error("Error downloading the file:", error);
  //   }
  // };

  // const Desktop = ({ children }) => {
  //   const isDesktop = useMediaQuery({ minDeviceWidth: 1224 });
  //   return isDesktop ? children : null;
  // };

  // const Mobile = ({ children }) => {
  //   const isMobile = useMediaQuery({ maxDeviceWidth: 1223 });
  //   return isMobile ? children : null;
  // };

  return (
    <div className="roomimg resrecpage">
    <div className="desk-customreceivedivfix">
          <div className="custommodaltitle " style={{fontSize:'10vw'}}>
            <p>점검 결과</p>
          </div>
          <div className="circlelinebox">
            <span>
              <div className="flexlinebox">
                <p className="circle">
                  {/* {showCheckmark("WAITING_INSPECTION_DATE")} */}
                  <p className="listline">확인중</p>
                </p>
              </div>
            </span>
            <p className="moline"></p>
            <span>
              <div className="flexlinebox">
                <p className="circle" >
                  {/* {showCheckmark("WAITING_FOR_INSPECTION")} */}
                  <p className="listline">점검 대기</p>
                </p>
              </div>
            </span>
            <p className="moline"></p>
            <span>
              <div className="flexlinebox">
                <p className="circle">
                  {/* {showCheckmark("IN_PROGRESS")} */}
                  <p className="listline">진행 중</p>
                </p>
              </div>
            </span>
            <p className="moline"></p>
            <span>
              <div className="flexlinebox">
                <p className="circle">
                  {/* {showCheckmark("DONE")} */}
                  <p className="listline">완료</p>
                </p>
              </div>
            </span>
          </div>
          <div style={{display:'flex', justifyContent:'center'}}>
          <div className="middlemodalsxmo">
            <div className="boxpage">
              <div className="vertical-center" >
                <p style={{ marginLeft: "5%" }}>saddsfa</p>
                <p style={{ marginLeft: "5%" }}>sadf</p>{" "}
         
                    <p
                      // onClick={() => handleReportDownload()}
                      style={{ marginLeft: "5%", color: "blue" }}
                    >
                      보고서 다운로드 : 보고서 URL
                    </p>
                    <p
                      // onClick={() => handleZipDownload()}
                      style={{ marginLeft: "5%", marginTop: "-3%", color: "blue" }}
                    >
                      사진 파일 다운로드 : 사진파일.zip
                    </p>
                    </div>
              </div>
            </div>
          </div>
          <div style={{display:'flex', justifyContent:'center'}}>
          <div className="middlemodal">
            <button className="button bigbuttons" style={{width:'30vw',fontSize:'0.8rem'}}>
              확인하기
            </button>
          
              <button className="button bigbuttons"style={{width:'30vw', fontSize:'0.8rem'}}>
                취소하기
              </button>
              </div>
          </div>
        </div>

        </div>
  );
}

export default Fixcustom;
