import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Receiveresult.css';

function Receiveresult() {
  const [cancellationStatus, setCancellationStatus] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const handleCancellation = async () => {
    try {
      const id = 6; // Replace with the actual ID you want to cancel
      const response = await fetch(`${BASE_URL}/api/v1/guest/request/${id}/cancel`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: "string",
          message: "string",
          status: 0
        })
      });

      if (response.ok) {
        const responseData = await response.json();
        setCancellationStatus(responseData.message);
        console.log("Cancellation request was successful.");
        navigate("/moneyreturn");
      } else {
        console.log("Cancellation request failed.");
      }
    } catch (error) {
      console.error("An error occurred while processing your request:", error);
    }
  };

  return (
    <div className="roomimg resrecpage backgr">
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
          <button className="button middlebutton" onClick={handleCancellation}>
            신청취소
          </button>
          <button className="button middlebutton">확인</button>
        </div>
      </div>
      {cancellationStatus && (
        <div className="cancellation-status">
          {cancellationStatus}
        </div>
      )}
    </div>
  );
}

export default Receiveresult;