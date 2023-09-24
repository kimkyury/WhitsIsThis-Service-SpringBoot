import React, { useState } from "react";
import "./CustomreceiveModal.css";
import Address from "../addresscomp/address";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../calendar/calendar.css';
import Receivesuc from "./receivesuccess"; // 받아온 receivesuc 컴포넌트를 불러옵니다.

function CustomreceiveModal() {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [isApplicationSuccess, setIsApplicationSuccess] = useState(false);

  const handleOpenAddressModal = () => {
    setShowAddressModal(true);
  };

  const handleCloseAddressModal = () => {
    setShowAddressModal(false);
  };

  const [startDate, endDate] = dateRange;
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const handleInputAddress = (address) => {
    const formattedAddress = `${address.address_name} ${
      address.road_address && address.road_address.building_name
        ? `- ${address.road_address.building_name}`
        : ""
    }`;
    setSelectedAddress(formattedAddress);
    setShowAddressModal(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
    setUploadedFileName(file.name);
  };

  const handleOpenFileInput = () => {
    document.getElementById('fileInput').click();
  };

  const handleApply = async () => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    // 주소를 선택하지 않았을 때의 예외 처리 추가
    if (!selectedAddress) {
      console.error('주소를 선택해주세요.');
      alert('주소를 선택해주세요.');
      return;
    }

    // 다른 필수 필드들에 대한 유효성 검사
    const addressDetail = document.querySelector('.input[placeholder="상세 주소를 입력해주십시오.(동 호수 포함)"]').value;
    const requestContent = document.querySelector('.input[placeholder="요청 사항을 입력해주십시오."]').value;
    const requesterName = document.querySelector('.input[placeholder="이름을 입력해주십시오."]').value;
    const requesterPhone = document.querySelector('.input[placeholder="연락처를 입력해주십시오."]').value;

    if (!addressDetail || !requestContent || !requesterName || !requesterPhone) {
      console.error('필수 정보를 모두 입력해주세요.');
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('warrant', uploadedFile);

    if (selectedAddress) {
      formData.append('address', selectedAddress.split(' ')[0]);
    }

    formData.append('addressDetail', addressDetail);
    formData.append('inspectionEnd', formattedEndDate);
    formData.append('inspectionStart', formattedStartDate);
    formData.append('requestContent', requestContent);
    formData.append('requesterName', requesterName);
    formData.append('requesterPhone', requesterPhone);

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/guest/requests`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

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

      setIsApplicationSuccess(true);
    } catch (error) {
      console.error('신청 처리 중 오류가 발생했다.', error, formData);
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
          <p className="minititle">위임장 사진</p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            {uploadedFileName && (
              <p>{uploadedFileName}</p>
            )}
            <button className="button minibutton" onClick={handleOpenFileInput}>
              찾아보기
            </button>
          </div>
          <p className="minititle">주소</p>
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
            <DatePicker
              dateFormat='yyyy.MM.dd'
              shouldCloseOnSelect
              minDate={new Date()}
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update)
              }}
              withPortal
              className='datePicker'
            />
          </div>
        </div>
      </div>
      <div className="middlemodal">
        <button className="button bigbuttons" onClick={handleApply}>
          신청하기
        </button>
      </div>
      {showAddressModal && (
        <div className="address-modal">
          <button className="close-button" onClick={handleCloseAddressModal}>
            닫기
          </button>
          <Address selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} onSelect={handleInputAddress} />
        </div>
      )}
      {isApplicationSuccess && (
        <Receivesuc />
      )}
    </div>
  );
}

export default CustomreceiveModal;
