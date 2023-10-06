import React, { useEffect, useState } from 'react';
import './Receive.css';
import axios from 'axios';
import { BiSolidDownload } from "react-icons/bi";
function RequestModals({ selectedItems, setShowModals }) {
  const [requestData, setRequestData] = useState({});
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const refreshToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    console.log(selectedItems.requests[0].id)
    if (selectedItems && selectedItems.requests[0].id) {
      const apiUrl = `${BASE_URL}/api/v1/private/requests/${selectedItems.requests[0].id}`;

      const headers = {
        Authorization: refreshToken,
      };
   
      axios.get(apiUrl, { headers })
        .then((response) => {
          console.log('API Response:', response.data);
          const data = response.data;
          console.log(data)
          setRequestData(data);
   
        })
        .catch((error) => {
          console.error('get요청 중 에러 발생:', error);
        });
    }
  }, [selectedItems, BASE_URL, refreshToken]);

  const closeModal = () => {
    setShowModals(false);
  };
  // 위임장 사진을 다운로드하는 함수
  const downloadWarrantImage = () => {
    if (requestData.data && requestData.data.warrantUrl) {
      // 서버에서 파일 다운로드 엔드포인트에 요청을 보내기 위한 URL을 생성합니다.
      const downloadUrl = `${BASE_URL}/api/v1/download/${requestData.data.warrantUrl}`;
      
      // 서버에서 파일 다운로드를 위한 GET 요청을 보냅니다.
      axios.get(downloadUrl, {
        responseType: 'blob', // 바이너리 데이터로 응답 받기 위해 responseType을 설정합니다.
        headers: {
          Authorization: refreshToken,
        },
      })
      .then((response) => {
        // HTTP 응답에서 파일 데이터를 가져옵니다.
        const fileData = response.data;
        
        // 파일 다운로드를 위한 Blob 객체를 생성합니다.
        const blob = new Blob([fileData], { type: 'application/octet-stream' });
  
        // Blob을 URL로 변환합니다.
        const blobUrl = window.URL.createObjectURL(blob);
  
        // 새로운 링크 요소를 생성하고 다운로드 속성을 설정합니다.
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = requestData.data.warrantUrl;
  
        // Trigger the click event to start the download
        document.body.appendChild(downloadLink);
        downloadLink.click();
  
        // 사용이 끝난 Blob URL을 해제합니다.
        window.URL.revokeObjectURL(blobUrl);
  
        // 링크 요소를 삭제합니다.
        document.body.removeChild(downloadLink);
      })
      .catch((error) => {
        console.error('Download error:', error);
        // Handle the error here, for example, show an error message to the user.
      });
    } else {
      console.error('No warrant URL found in requestData');
      // Handle the case when no warrant URL is found in requestData.
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
                  <p className="nametag" style={{ width: '20vw' }}>
                    신청자명
                  </p>
                  <p className="Vtag vtag">{requestData.data.requesterName}</p>
                  <p className="nametag" style={{ width: '20vw' }}>
                    요청사항
                  </p>
                  <p className="Vtag vtag">{requestData.data.requestContent}</p>
                  <p className="nametag" style={{ width: '20vw' }}>
                    연락처
                  </p>
                  <p className="Vtag vtag">{requestData.data.requesterPhone}</p>
                  {/* <p className="nametag" style={{ width: '20vw' }}>
                    점검 예정일
                  </p>
                  <p className="Vtag vtag">{requestData.data.inspectionDate}</p> */}
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div>
              {requestData.data ? (
                <div>
                  <p className="nametag" style={{ width: '20vw' }}>
                    주소
                  </p>
                  <p className="Vtag vtag">
                    {requestData.data.address} {requestData.data.addressDetail}
                  </p>
                  <p className="nametag" style={{ width: '20vw' }}>
                    검사 예정일
                  </p>
                  <p className="Vtag vtag">{requestData.data.inspectionStart} ~ {requestData.data.inspectionEnd}</p>
                  <p className="nametag" style={{ width: '20vw' }}>
                    위임장 사진
                  </p>
                  {requestData.data.warrantUrl ? (
                    <div>
                      {/* <img src={`${process.env.REACT_APP_S3_BASE_URL}${requestData.data.warrantUrl}`} alt="위임장 사진" /> */}
                      {/* "다운로드" 버튼 추가 */}
                      {/* <button className='i' style={{ border:'none', backgroundColor:'white'}} onClick={downloadWarrantImage}><BiSolidDownload/>{requestData.data.warrantUrl}</button> */}
                      <button className='i' style={{ marginleft:'5vw', border:'none', backgroundColor:'white', width:'23vw', fontSize:'0.5vw'}} onClick={downloadWarrantImage}><BiSolidDownload/>{requestData.data.warrantUrl}</button>

                    </div>
                  ) : (
                    <p style={{marginLeft:'1.2vw', fontSize:'0.5vw'}}>No image available</p>
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

export default RequestModals;
