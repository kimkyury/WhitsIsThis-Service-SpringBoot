// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './Receiveresult.css';

// function Receiveresult() {
//   const [cancellationStatus, setCancellationStatus] = useState(null);
//   const BASE_URL = process.env.REACT_APP_BASE_URL;
//   const navigate = useNavigate();

//   const handleCancellation = async () => {
//     try {
//       const id = sessionStorage.getItem('id'); // Replace with the actual ID you want to cancel
//       const response = await fetch(`${BASE_URL}/api/v1/guest/request/${id}/cancel`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           data: "string",
//           message: "string",
//           status: 0
//         })
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         setCancellationStatus(responseData.message);
//         console.log("Cancellation request was successful.");
//         navigate("/moneyreturn");
//       } else {
//         console.log("Cancellation request failed.");
//       }
//     } catch (error) {
//       console.error("An error occurred while processing your request:", error);
//     }
//   };

//   return (
//     <div className="roomimg resrecpage backgr">
//       <div className="customreceivedivs">
//         <div className="custommodaltitle">
//           <p>신청 결과</p>
//         </div>
//         <div className="middlemodals">
//           <div>
//             <div className="customgrids">
//               <p className="recrestitle">은행명 :</p>
//               <p>계좌명</p>
//             </div>
//             <p className="recrestitle">가상계좌 :</p>
//             <p>가상계좌들어갈곳</p>
//           </div>
//         </div>
//         <div className="middlebox">
//           <button className="button middlebutton" onClick={handleCancellation}>
//             신청취소
//           </button>
//           <button className="button middlebutton">확인</button>
//         </div>
//       </div>
//       {cancellationStatus && (
//         <div className="cancellation-status">
//           {cancellationStatus}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Receiveresult;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Receiveresult.css";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

function Receiveresult() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const location = useLocation();

  const [bankName, setBankName] = useState("");

  const { id, status, paymentId, virtualAccount, virtualBankCode } = location.state;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/banks`)
      .then((res) => {
        const banks = res.data.data;
        const matchedBank = banks.find((bank) => bank.code === virtualBankCode);

        if (matchedBank) setBankName(matchedBank.name);
      })
      .catch((error) => {
        alert("오류가 발생했습니다.");
        navigate("/", { replace: true });
      });
    return () => {};
  }, [location.state]);

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minDeviceWidth: 1224 });
    return isDesktop ? children : null;
  };

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxDeviceWidth: 1223 });
    return isMobile ? children : null;
  };

  const handleCancellation = async () => {
    if (!window.confirm("신청을 취소하시겠습니까?")) return;

    axios
      .post(`${BASE_URL}/api/v1/guest/payments/${paymentId}/cancel`, {}, { withCredentials: true })
      .then((response) => {
        navigate("/information", {
          state: { content: "정상적으로 취소되었습니다." },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleOk = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="roomimg resrecpage">
      <Desktop>
        <div className="desk-customreceivedivs">
          <div className="custommodaltitle">
            <p>신청 결과 : {status}</p>
          </div>
          <div className="middlemodals">
            <div>
              <div className="desk-customgrids">
                <p className="desk-recrestitle">은행명 :</p>
                <p>{bankName}</p>
              </div>
              <div className="desk-customgrids">
                <p className="desk-recrestitle">가상계좌 :</p>
                <p>{virtualAccount}</p>
              </div>
            </div>
          </div>
          <div className="middlebox">
            <button className="button middlebutton" onClick={() => handleOk()}>
              확인
            </button>
            <button className="button middlebutton" onClick={() => handleCancellation()}>
              신청취소
            </button>
          </div>
        </div>
      </Desktop>
      <Mobile>
        <div className="customreceivedivs">
          <div className="custommodaltitle">
            <p>신청 결과 : 결제 대기</p>
          </div>
          <div className="middlemodals">
            <div>
              <div className="customgrids">
                <p className="recrestitle">은행명 :</p>
                <p>{bankName}</p>
              </div>
              <div className="desk-customgrids">
                <p className="desk-recrestitle">가상계좌 :</p>
                <p>{virtualAccount}</p>
              </div>
            </div>
          </div>
          <div className="middlebox">
            <button className="button middlebutton" onClick={() => handleOk()}>
              확인
            </button>
            <button className="button middlebutton" onClick={() => handleCancellation()}>
              신청취소
            </button>
          </div>
        </div>
      </Mobile>
    </div>
  );
}

export default Receiveresult;
