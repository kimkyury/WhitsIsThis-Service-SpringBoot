import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Resultconfirm.css';
import { useMediaQuery } from "react-responsive";
import Phoneconfirm from '../../../customcomponent/customReceive/Phoneconfirm';

function Resultconfirm() {
  const [customdata, setCustomdata] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [phoneConfirmVisible, setPhoneConfirmVisible] = useState(false);
  const [isSuc, setIsSuc] = useState(false);
  const navigate = useNavigate();
  const phoneNumberInputRef = useRef(null);

  useEffect(() => {
    if (phoneNumberInputRef.current) {
      const requesterPhoneNumber = phoneNumberInputRef.current.value;
    }
  }, []);

  const handleSendSMS = async () => {
    if (!isSuc) {
      if (phoneNumberInputRef.current && phoneNumberInputRef.current.value) {
        const requesterPhoneNumber = phoneNumberInputRef.current.value;
        const phone = requesterPhoneNumber;
        const requestData = {
          phone: phone,
        };

        try {
          const response = await axios.post(`${BASE_URL}/api/v1/auth/phone/sms`, requestData, { withCredentials: true});
          setPhoneConfirmVisible(true);
          setIsVerified(true)
        } catch (error) {
          console.error('SMS 전송 중 오류 발생:', error);
        }
      }
    }
  };

  const handleConfirmation = () => {
    axios
    .get(
      `${BASE_URL}/api/v1/guest/requests/verification`,
      {
        params: {
          requesterPhone: phoneNumberInputRef.current.value
        },
        withCredentials: true
      }
      )
      .then((response) => {
        console.log(phoneNumberInputRef.current.value)
        const matchingData = response.data;
  
        if (matchingData) {
          const status = matchingData.data.status;
          console.log(status)
          switch (status) {
            case "CANCELED":
              sessionStorage.setItem("id", response.data.data.requestId);
              navigate("/moneyreturn");
              break;
            case "WAITING_FOR_PAY":
              sessionStorage.setItem("status", matchingData.data.status);
              sessionStorage.setItem("employeeName", matchingData.data.employeeName);
              sessionStorage.setItem("responsedata", matchingData.data.inspectionEnd);
              sessionStorage.setItem("id", response.data.data.requestId);
              navigate("/receiveresult");
              break;
            case "WAITING_INSPECTION_DATE":
            case "WAITING_FOR_INSPECTION":
            case "IN_PROGRESS":
            case "DONE":
              sessionStorage.setItem("status", matchingData.data.status);
              sessionStorage.setItem("employeeName", matchingData.data.employeeName);
              sessionStorage.setItem("responsedata", matchingData.data.inspectionEnd);
              sessionStorage.setItem("id", matchingData.data.history.id);
              navigate("/fixcustom");
              break;
            default:
              // 다른 상태에 따른 처리
              console.log(status)
              break;
          }
        } else {
          alert("상태가 대기 중이 아닙니다.");
          
        }
      })
      .catch((error) => {
        console.error("Error verifying phone number", error);
        alert("전화번호 인증이 필요합니다.");
        console.log(phoneNumberInputRef.current.value)
      });
  };


  return (
    <div className="roomimg resrecpage">
      <div className="customreceivedivconfirm">
        <div className="custommodaltitle">
          <p>결과확인</p>
        </div>
        <div className="middlemodalsx">
          <div className="customgrid">
            <input
              className="input cinputs"
              placeholder="연락처를 입력해주십시오."
              ref={phoneNumberInputRef}
              value={phoneNumberInput}
              onChange={(e) => setPhoneNumberInput(e.target.value)}
            />
            {isSuc ? (
              <button className="button minibutton"style={{marginLeft:'2vw',marginTop:'0.5vh'}} onClick={handleSendSMS}>확인</button>
            ) : (
              <button className="button minibutton"style={{marginLeft:'2vw', marginTop:'0.5vh'}} onClick={handleSendSMS}>인증하기</button>
            )}
          </div>
        </div>
        <div className='middlemodalbox'>
          <button
            className="button bigbutton"
            
            onClick={handleConfirmation}
            disabled={!isVerified} // 인증이 완료되지 않은 경우 버튼 비활성화
          >
            확인하기
          </button>
        </div>
      </div>
      {phoneConfirmVisible && (
        <Phoneconfirm isSuc={isSuc} setIsSuc={setIsSuc} setPhoneConfirmVisible={setPhoneConfirmVisible} requesterPhoneNumber={phoneNumberInput} setIsVerified={setIsVerified} />
      )}
    </div>
  );
}

export default Resultconfirm;
