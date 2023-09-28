import React, { useEffect, useState } from 'react';
import './Receive.css';
import axios from 'axios'; // Import axios

function RequestModal({ selectedItem, setShowModal }) {
  const [requestData, setRequestData] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const refreshToken = sessionStorage.getItem('refreshToken');

  useEffect(() => {
    // Check if selectedItem exists and has an id
    if (selectedItem && selectedItem.id) {
      // Define the API endpoint URL
      const apiUrl = `${BASE_URL}/api/v1/private/requests/${selectedItem.id}`;

      // Define the headers for the request
      const headers = {
        Authorization: refreshToken, // Add your authorization token here
      };

      // Use axios to send a GET request to the API
      axios.get(apiUrl, { headers })
        .then((response) => {
          // Parse the response data
          const data = response.data.object;

          // Store the API response data in state
          setRequestData(data);
        })
        .catch((error) => {
          console.error('get요청 중 에러 발생:', error);
        });
    }
  }, [selectedItem, BASE_URL, refreshToken]);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="Modalbox fontb">
    
      <div>
        <div>
          <p className="recmodalform">
            <span className="recfspan">신청내용</span>
            <button onClick={closeModal} className="recmodalbutton">
              <span style={{ textAlign: 'center' }}>닫기</span>
            </button>
          </p>
          <div className="gridmodal">
            <div className="nameVtagv">
              {/* Render the data from the API response */}
              {requestData ? (
                <div>
                  <p className="nametag" style={{ width: '10vw' }}>
                    신청자명
                  </p>
                  <p className="Vtag vtag">{requestData.requesterName}</p>
                  <p className="nametag" style={{ width: '10vw' }}>
                    요청사항
                  </p>
                  <p className="Vtag vtag">{requestData.requestContent}</p>
                  <p className="nametag" style={{ width: '10vw' }}>
                    연락처
                  </p>
                  <p className="Vtag vtag">{requestData.requesterPhone}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div>
              {/* Add similar rendering for other data fields */}
              {requestData ? (
                <div>
                  <p className="nametag" style={{ width: '10vw' }}>
                    주소
                  </p>
                  <p className="Vtag vtag">
                    {requestData.address} {requestData.addressDetail}
                  </p>
                  <p className="nametag" style={{ width: '10vw' }}>
                    검사 시작일
                  </p>
                  <p className="Vtag vtag">{requestData.inspectionStart}</p>
                  <p className="nametag" style={{ width: '10vw' }}>
                    검사 종료일
                  </p>
                  <p className="Vtag vtag">{requestData.inspectionEnd}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestModal;
