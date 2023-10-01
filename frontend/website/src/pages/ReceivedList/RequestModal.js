import React, { useEffect, useState } from 'react';
import './Receive.css';
import axios from 'axios';
import { BiSolidDownload } from "react-icons/bi";
function RequestModal({ selectedItem, setShowModal }) {
  const [requestData, setRequestData] = useState({});
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const refreshToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    if (selectedItem && selectedItem.id) {
      const apiUrl = `${BASE_URL}/api/v1/private/requests/${selectedItem.id}`;

      const headers = {
        Authorization: refreshToken,
      };

      axios.get(apiUrl, { headers })
        .then((response) => {
          console.log('API Response:', response.data);
          const data = response.data;
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

  // 위임장 사진을 다운로드하는 함수
  const downloadWarrantImage = () => {
    if (requestData.data && requestData.data.warrantUrl) {
      const downloadLink = document.createElement('a');
      downloadLink.href = requestData.data.warrantUrl;
      downloadLink.download = requestData.data.warrantUrl; // 다운로드될 파일 이름
      downloadLink.click();
      console.log(requestData.data.warrantUrl)
    }
  };

  return (
    <div className="Modalbox fontb" style={{ zIndex: '9999' }}>
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
              {requestData.data ? (
                <div>
                  <p className="nametag" style={{ width: '10vw' }}>
                    신청자명
                  </p>
                  <p className="Vtag vtag">{requestData.data.requesterName}</p>
                  <p className="nametag" style={{ width: '10vw' }}>
                    요청사항
                  </p>
                  <p className="Vtag vtag">{requestData.data.requestContent}</p>
                  <p className="nametag" style={{ width: '10vw' }}>
                    연락처
                  </p>
                  <p className="Vtag vtag">{requestData.data.requesterPhone}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div>
              {requestData.data ? (
                <div>
                  <p className="nametag" style={{ width: '10vw' }}>
                    주소
                  </p>
                  <p className="Vtag vtag">
                    {requestData.data.address} {requestData.data.addressDetail}
                  </p>
                  <p className="nametag" style={{ width: '10vw' }}>
                    검사 예정일
                  </p>
                  <p className="Vtag vtag">{requestData.data.inspectionStart} ~ {requestData.data.inspectionEnd}</p>
                  <p className="nametag" style={{ width: '10vw' }}>
                    위임장 사진
                  </p>
                  {requestData.data.warrantUrl ? (
                    <div>
                      {/* <img src={requestData.data.warrantUrl} alt="위임장 사진" /> */}
                      {/* "다운로드" 버튼 추가 */}
                      <button className='i' style={{ border:'none', backgroundColor:'white'}} onClick={downloadWarrantImage}><BiSolidDownload/>{requestData.data.warrantUrl}</button>
                    </div>
                  ) : (
                    <p>No image available</p>
                  )}
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
