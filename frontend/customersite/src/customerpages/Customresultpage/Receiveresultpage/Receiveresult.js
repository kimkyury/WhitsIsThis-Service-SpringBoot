import React, { useState } from "react";
import './Receiveresult.css';

function Receiveresult() {
  // State to store the cancellation status
  const [cancellationStatus, setCancellationStatus] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Function to handle cancellation button click
  const handleCancellation = async () => {
    try {
      // Replace {id} with the actual ID you want to cancel
      const id = 1; // Replace with the actual ID
      const response = await fetch(`${BASE_URL}/api/v1/guest/request/${id}/cancel`, {
        method: 'PATCH', // Specify the HTTP method as 'PATCH'
        // Add any necessary headers, such as authorization headers
      });

      if (response.ok) {
        // Cancellation request was successful
        console.log("Cancellation request was successful.");
      } else {
        // Cancellation request failed
        console.log("Cancellation request failed.");
      }
    } catch (error) {
      // Handle any network or other errors
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
