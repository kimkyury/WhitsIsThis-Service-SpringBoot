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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Receiveresult.css';
import { useMediaQuery } from "react-responsive";
function Receiveresult() {
  const [cancellationStatus, setCancellationStatus] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minDeviceWidth: 1224 });
    return isDesktop ? children : null;
  };
  
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxDeviceWidth: 1223 });
    return isMobile ? children : null;
  };
  const handleCancellation = async () => {
    try {
      const id = sessionStorage.getItem('id'); // 올바른 ID를 얻어올 필요가 있습니다.
      if (!id) {
        alert("ID를 찾을 수 없습니다."); // ID를 찾을 수 없는 경우 오류 처리
        return;
      }

      const response = await fetch(`${BASE_URL}/api/v1/guest/requests/${id}/cancel`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      }, { withCredentials: true});

      if (response.ok) {
        const responseData = await response.json();
        setCancellationStatus(responseData.message);
        console.log("Cancellation request was successful.");
        navigate("/moneyreturn");
      } else {
        const errorData = await response.json(); // 서버로부터의 오류 메시지 처리
        console.log("Cancellation request failed:", errorData.message);
      }
    } catch (error) {
      console.error("An error occurred while processing your request:", error);
    }
  };

  return (
    <div className="roomimg resrecpage">
      <Desktop>
      <div className="desk-customreceivedivs">
        <div className="custommodaltitle">
          <p>신청 결과</p>
        </div>
        <div className="middlemodals">
          <div>
            <div className="desk-customgrids">
              <p className="desk-recrestitle">은행명 :</p>
              <p>계좌명</p>
            </div>
            <p className="desk-recrestitle">가상계좌 :</p>
            <p>가상계좌들어갈곳</p>
          </div>
        </div>
        <div className="middlebox">
          <button className="button middlebutton">확인</button>
          <button className="button middlebutton" onClick={handleCancellation}>
            신청취소
          </button>
        </div>
      </div>
      {cancellationStatus && (
        <div className="cancellation-status">
          {cancellationStatus}
        </div>
      )}
      </Desktop>
      <Mobile>
      <div className="customreceivedivs">
        <div className="custommodaltitle">
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
          <button className="button middlebutton" onClick={handleCancellation}>
            신청취소
          </button>
        </div>
      </div>
      {cancellationStatus && (
        <div className="cancellation-status">
          {cancellationStatus}
        </div>
      )}
      </Mobile>
    </div>
  );
}

export default Receiveresult;
