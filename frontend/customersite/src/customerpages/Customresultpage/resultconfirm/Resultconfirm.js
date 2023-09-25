import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate를 import로 추가
import axios from "axios";
import './Resultconfirm.css';

function Resultconfirm() {
  const [customdata, setCustomdata] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [isVerified, setIsVerified] = useState(true);

  const navigate = useNavigate(); // useNavigate로 navigate 함수 가져오기

  const handlePhoneNumberVerification = () => {
    const matchingData = customdata.find((data) => data.phonenumber === phoneNumberInput);

    if (matchingData) {
      setIsVerified(true);

      axios.get(`${BASE_URL}/api/v1/guest/requests/verification?requesterPhone=${phoneNumberInput}`)
        .then((response) => {
          console.log("Verification request successful", response);
        })
        .catch((error) => {
          console.error("Error verifying phone number", error);
        });
    } else {
      alert("전화번호가 일치하지 않습니다.");
    }
  };

  // const handleConfirmation = () => {
  //   if (isVerified) {
  //     const matchingData = customdata.find((data) => data.phonenumber === phoneNumberInput);
  //     if (matchingData) {
  //       const status = matchingData.status;
 
  //       switch (status) {
  //         case "canceled":
  //           navigate("/refundPage"); // navigate 함수로 페이지 이동
  //           break;
  //         case "waiting_for_pay":
  //           navigate("/waitingForPayment");
  //           break;
  //         case "waiting_inspection_date":
  //         case "waiting_for_inspection":
  //         case "in_Progress":
  //         case "Done":
  //           navigate("/inspectionResult");
  //           break;
  //         default:
  //           // 다른 상태에 따른 처리
  //           break;
  //       }
  //     } else {
  //       alert("상태가 대기 중이 아닙니다.");
  //       console.log(matchingData)

  //     }
  //   } else {
  //     alert("전화번호 인증이 필요합니다.");
  //   }
  // };
  const handleConfirmation = () => {
    // 인증 없이 서버로 요청을 보내고, 서버에서 일치하는 데이터를 확인
    axios.get(`${BASE_URL}/api/v1/guest/requests/verification?requesterPhone=${phoneNumberInput}`)
      .then((response) => {
        const matchingData = response.data; // 서버로부터 받은 데이터를 확인

        if (matchingData) {
          const status = matchingData.data.status;
          
          console.log(status);
          switch (status) {
            case "CANCELED":
              navigate("/moneyreturn");
              sessionStorage.setItem('id', response.data.data.requestId)
              break;
            case "WAITING_FOR_PAY":
              sessionStorage.setItem('status', matchingData.data.status)
              sessionStorage.setItem('employeeName', matchingData.data.employeeName)
              sessionStorage.setItem('responsedata', matchingData.data.inspectionEnd)
              sessionStorage.setItem('id', response.data.data.requestId)
              navigate("/receiveresult");
              break;
            case "WAITING_INSPECTION_DATE":
            case "WAITING_FOR_INSPECTION":
            case "IN_PROGRESS":
            case "DONE":
              sessionStorage.setItem('status', matchingData.data.status)
              sessionStorage.setItem('employeeName', matchingData.data.employeeName)             
              sessionStorage.setItem('responsedata', matchingData.data.inspectionEnd)
              sessionStorage.setItem('id', response.data.data.history.id)
              navigate("/fixcustom");
              break;
            default:
              // 다른 상태에 따른 처리
              break;
          }
        } else {
          alert("상태가 대기 중이 아닙니다.");
        }
      })
      .catch((error) => {
        console.error("Error verifying phone number", error);
        alert("전화번호 인증이 필요합니다.");
      });
  };

  return (
    <div className="roomimg resrecpage backgr">
      <div className="customreceivedivconfirm">
        <div className="custommodaltitle">
          <p>결과확인</p>
        </div>
        <div className="middlemodalsx">
          <div className="customgrid">
            <input
              className="input cinput"
              placeholder="연락처를 입력해주십시오."
              value={phoneNumberInput}
              onChange={(e) => setPhoneNumberInput(e.target.value)}
            />
            <button
              className="button minibutton"
              style={{ marginLeft: '3%' }}
              // onClick={handlePhoneNumberVerification}
            >
              {isVerified ? "확인" : "인증하기"}
            </button>
          </div>
        </div>
        <div className='middlemodalbox'>
          <button
            className="button bigbutton"
            onClick={handleConfirmation}
          >
            확인하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Resultconfirm;
