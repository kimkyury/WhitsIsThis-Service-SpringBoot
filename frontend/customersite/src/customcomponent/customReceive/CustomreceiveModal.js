import React, { useState } from "react";
import "./CustomreceiveModal.css";
import Calendar from "../calendar/calendar";
import Address from "../addresscomp/address"; // 주소 컴포넌트 추가
import axios from 'axios'; // Axios 라이브러리 추가
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

function CustomreceiveModal() {
  const [showAddressModal, setShowAddressModal] = useState(false); // 주소 모달 표시 여부를 상태로 관리
  const [selectedAddress, setSelectedAddress] = useState(""); // 선택된 주소 데이터를 저장
  const [uploadedFile, setUploadedFile] = useState(null); // 업로드된 파일 상태 추가
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [uploadedFileName, setUploadedFileName] = useState(""); // 업로드된 파일 이름 추가

  // 주소찾기 버튼을 클릭하면 모달을 표시하는 함수
  const handleOpenAddressModal = () => {
    setShowAddressModal(true);
  };

  // 모달을 닫는 함수
  const handleCloseAddressModal = () => {
    setShowAddressModal(false);
  };

  // 주소를 선택하고 입력하기 버튼을 클릭할 때 호출되는 함수
  const handleInputAddress = (address) => {
    // 주소 객체에서 필요한 정보를 추출하여 문자열로 변환
    const formattedAddress = `${address.address_name} ${
      address.road_address && address.road_address.building_name
        ? `- ${address.road_address.building_name}`
        : ""
    }`;
    setSelectedAddress(formattedAddress);
    setShowAddressModal(false); // 모달 닫기
  };

  // 파일 선택 시 호출되는 함수
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
    setUploadedFileName(file.name); // 파일 이름 저장
  };

  // '찾아보기' 버튼 클릭 시 파일 선택 창 열기
  const handleOpenFileInput = () => {
    document.getElementById('fileInput').click();
  };
  // '신청하기' 버튼 클릭 시 수행할 함수
  const handleApply = async () => {
    // FormData 객체를 생성하고 데이터를 추가합니다.
    const formData = new FormData();
    formData.append('requesterName', document.querySelector('.input[placeholder="이름을 입력해주십시오."]').value);
    formData.append('requestContent', document.querySelector('.input[placeholder="요청 사항을 입력해주십시오."]').value);
    formData.append('warrant', uploadedFile); // 업로드된 파일 추가
    formData.append('address', selectedAddress.split(' ')[0]); // 주소
    formData.append('addressDetail', document.querySelector('.input[placeholder="상세 주소를 입력해주십시오.(동 호수 포함)"]').value);
    formData.append('requesterPhone', document.querySelector('.input[placeholder="연락처를 입력해주십시오."]').value);
    formData.append('inspectionEnd', endDate);
    formData.append('inspectionStart', startDate)

    try {
      // 서버로 FormData를 POST 요청으로 보냅니다.
      const response = await axios.post('/api/v1/guest/regist', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // FormData를 사용할 때 필요한 헤더 설정
        },
        responseType: 'blob', // 파일 다운로드 형식으로 응답을 받습니다.
      });

      if (response.status === 200) {
        console.log('신청이 성공적으로 처리되었습니다.');

        // 파일 다운로드를 위한 코드
        const contentDisposition = response.headers['content-disposition'];
        const fileName = contentDisposition.split(';')[1].trim().split('=')[1];
        const blob = new Blob([response.data], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

      } else {
        console.error('신청 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('신청 처리 중 오류가 발생했습니다.', error);
    }
  };
  return (
    <div className="customreceivediv">
      <div className="custommodaltitle">
        <p>신청하기</p>
      </div>
      <div className="middlemodal">
        <div>
          <p className="minititle">신청자명</p>
          <input
            style={{ width: "18rem", height: "2.3rem" }}
            className="input"
            placeholder="이름을 입력해주십시오."
          />
          <p className="minititle">요청 사항</p>
          <input
            className="input"
            style={{ width: "18rem", height: "4.2rem" }}
            placeholder="요청 사항을 입력해주십시오."
          />
          <p className="minititle">연락처</p>
          <div className="customgrid">
            <input
              className="input cinput"
              placeholder="연락처를 입력해주십시오."
            />
            <button className="button minibutton">인증하기</button>
          </div>
          {/* <p className="minititle" style={{ width: "16rem", height: "2rem" }}>
            비밀번호
          </p>
          <input
            style={{ width: "18rem", height: "2.3rem" }}
            className="input"
            placeholder="비밀번호를 입력해주십시오."
          /> */}

<p className="minititle">위임장 사진</p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          {/* 업로드된 파일 이름 표시 */}
          {uploadedFileName && (
            <p>{uploadedFileName}</p>
          )}
          <button className="button minibutton" onClick={handleOpenFileInput}>
            찾아보기
          </button>
        </div>
          <p
            className="minititle"
            style={{ width: "16rem", height: "2.3rem" }}
          >
            주소
          </p>
          <div className="customgrid">
            <input
              className="input cinput"
              placeholder="주소을 입력해주십시오."
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
            />
            <button
              className="button minibutton"
              onClick={handleOpenAddressModal}
            >
              주소찾기
            </button>
          </div>
          <p className="minititle">상세주소</p>
          <input
            style={{ width: "18rem", height: "2.3rem" }}
            className="input"
            placeholder="상세 주소를 입력해주십시오.(동 호수 포함)"
          />
          <div className="customgridx">
            <p className="minititle">점검 예정 일자 :</p>
            <Calendar dateRange={dateRange} setDateRange={setDateRange} startDate={startDate} endDate={endDate}/>
          </div>
        </div>
      </div>
      <div className="middlemodal">
        <button className="button bigbuttons" onClick={handleApply}>
          신청하기
        </button>
      </div>

      {/* 주소 모달 */}
      {showAddressModal && (
        <div className="address-modal">
          <button className="close-button" onClick={handleCloseAddressModal}>
            닫기
          </button>
          <Address selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} onSelect={handleInputAddress} />
        </div>
      )}
    </div>
  );
}

export default CustomreceiveModal;