import React, { useState } from "react";
import axios from "axios"; // Axios를 import 합니다.
import './CustomreceiveModal.css';

function Phoneconfirm({ requesterPhoneNumber, setPhoneConfirmVisible, isSuc, setIsSuc }) {
  const [authCode, setAuthCode] = useState(""); // 인증 코드를 상태로 관리합니다.
  const BASE_URL= process.env.REACT_APP_BASE_URL
  const handleVerification = async () => {
    try {
      // API 요청을 보냅니다.
      const response = await axios.post(`${BASE_URL}/api/v1/auth/phone/verification`, {
        phone: requesterPhoneNumber,
        authCode: authCode, // 입력한 인증 코드를 전달합니다.
      }, { withCredentials: true });
      console.log(response)

      // 성공적으로 인증되었을 때 처리
      // 여기에서 모달을 닫아줄 수 있습니다.
      setPhoneConfirmVisible(false);
      setIsSuc(true)
      alert('인증이 완료되었습니다.')
    } catch (error) {
      // 인증에 실패했을 때 처리
      console.error("인증 실패:", error);
      setPhoneConfirmVisible(false);
      setIsSuc(false)
      console.log(requesterPhoneNumber)
      // 필요한 오류 처리를 여기에 추가하세요.
      // console.log(response)
    }
  };

  return (
    <div className="phone-confirm-modal">  
      <div className="customreceivedivconfirms">
        <div className="customgrid">
          <input
            className="input cinputinp"
            placeholder="인증번호를 입력해주십시오."
            style={{ borderBottom: '0.1rem solid black' }}
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
          />
          <button className="button minibutton" style={{ marginLeft: '3vw' }} onClick={handleVerification}>
            인증하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default Phoneconfirm;
