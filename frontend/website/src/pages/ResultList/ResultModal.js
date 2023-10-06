import React, { useState, useEffect } from "react";
import Pdf from '../WebMain/Pdf';
import AuthHttp from "../../component/util/AuthHttp";
import axios from 'axios';
import SubPdf from '../WebMain/Subpdf';
import PDFLink from '../../pages/WebMain/Pdflink';
function ResultModal({ selectedItem, setShowModal }) {
  const [apiData, setApiData] = useState(null);
  const [showUp, setShowUp] = useState(true);
  const closeModal = () => {
    setShowModal(false);
  };
  const handleZipDownload = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/histories/${apiData.data.history.id}/zip`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "zip.zip");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert("파일이 존재하지 않습니다.");
      console.error("Error downloading the file:", error);
    }
  };






  const fetchdetaildata = async (id) => {
    try {
      const response = await AuthHttp({
        method: "get",
        url: `/private/requests/${id}`,
      });
      if (response.data) {
        setApiData(response.data); // API 응답 데이터를 상태에 저장
        console.log(response.data)
      } else {
        console.log('에러발생')
      }
    } catch (e) {
      console.error(e);
    }
  };
//   const formattedDate = `${apiData.data.history.inspectedAt.getFullYear()}-${(apiData.data.history.inspectedAt.getMonth() + 1)
//     .toString()
//     .padStart(2, "0")}-${apiData.data.history.inspectedAt
//     .getDate()
//     .toString()
//     .padStart(2, "0")}`;

// console.log(formattedDate);
  useEffect(() => {
    if (selectedItem) {
      // selectedItem이 변경될 때마다 fetchdetaildata 함수 실행
      fetchdetaildata(selectedItem.id);
      console.log(selectedItem.id)
    }
  }, [selectedItem]);

  if (!selectedItem) {
    return null;
  }

  return (
    <div className="Modalboxinpu flexcenter fontb" style={{ backgroundColor: 'white' }}>
      <div >
        <p className="resmodalform" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ marginRight: '2vw' }}>결과내용</span>
        <button onClick={closeModal} className="resclosebutton">
          <span style={{ textAlign: 'center' }}>닫기</span>
        </button>
        </p>
        <div>
      
          {/* API에서 받아온 데이터를 Pdf 컴포넌트로 전달합니다. */}
          <Pdf data={apiData} showUp={showUp} setShowUp={setShowUp} />
          <div style={{display:'flex', justifyContent:'flex-end'}}>
            {!showUp && (
          <a className="download" onClick={() => handleZipDownload()}>사진.zip 다운로드</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultModal;
