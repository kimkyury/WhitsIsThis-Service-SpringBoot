import React, { useState, useEffect } from "react";
import "./CustomreceiveModal.css";
import Address from "../addresscomp/address";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../calendar/calendar.css";
import Receivesuc from "./receivesuccess";
import Phoneconfirm from "./Phoneconfirm"; // Phoneconfirm 컴포넌트를 import
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
function CustomreceiveModal() {
  const navigate = useNavigate();
  // const [requesterPhoneNumber, setRequesterPhoneNumber] = useState(""); // 연락처 상태 추가
  // const requesterPhoneNumber = document.querySelector('.input[placeholder="연락처를 입력해주십시오."]').value;
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [isApplicationSuccess, setIsApplicationSuccess] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [requesterPhone, setRequesterPhone] = useState(""); // 요청자 연락처
  const [phoneConfirmVisible, setPhoneConfirmVisible] = useState(false); // Phoneconfirm 모달 표시 상태
  const [isSuc, setIsSuc] = useState(false);
  // const [requesterPhoneNumber, setRequesterPhoneNumber] = useState(""); // 요청자 연락처를 상태로 관리
  const handleOpenAddressModal = () => {
    setShowAddressModal(true);
  };

  const handleCloseAddressModal = () => {
    setShowAddressModal(false);
  };

  const [startDate, endDate] = dateRange;
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
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
    document.getElementById("fileInput").click();
  };

  const handleApply = async () => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    if (!selectedAddress) {
      console.error("주소를 선택해주세요.");
      alert("주소를 선택해주세요.");
      return;
    }

    const addressDetail = document.querySelector(
      '.input[placeholder="상세 주소를 입력해주십시오.(동 호수 포함)"]'
    ).value;
    const requestContent = document.querySelector(
      '.input[placeholder="요청 사항을 입력해주십시오."]'
    ).value;
    const requesterName = document.querySelector(
      '.input[placeholder="이름을 입력해주십시오."]'
    ).value;
    const requesterPhoneNumber = document.querySelector(
      '.input[placeholder="연락처를 입력해주십시오."]'
    ).value;
    const buildingArea = document.querySelector(
      '.input[placeholder="면적을 입력해주십시오."]'
    ).value;

    if (
      !addressDetail ||
      !requestContent ||
      !requesterName ||
      !requesterPhoneNumber ||
      !buildingArea
    ) {
      console.error("필수 정보를 모두 입력해주세요.");
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("warrant", uploadedFile);

    const jsonData = {
      address: selectedAddress,
      addressDetail: addressDetail,
      inspectionEnd: formattedEndDate,
      inspectionStart: formattedStartDate,
      requestContent: requestContent,
      requesterName: requesterName,
      requesterPhone: requesterPhoneNumber,
      bankCode: selectedBank,
      buildingArea: buildingArea,
    };

    formData.append("requestRegisterRequest", JSON.stringify(jsonData));
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/guest/requests`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      setIsApplicationSuccess(true);

      // 요청이 성공하면 Phoneconfirm 모달을 표시
      setPhoneConfirmVisible(true);
      alert('신청이 완료되었습니다.');
      navigate("/");
    } catch (error) {
      console.error("신청 처리 중 오류가 발생했다.", error);
      console.log(jsonData, formData);
    }
  };

  const handleSendSMS = async () => {
    if (!isSuc) {
      const requesterPhoneNumber = document.querySelector(
        '.input[placeholder="연락처를 입력해주십시오."]'
      ).value;
      const phone = requesterPhoneNumber;
      console.log(phone);
      const requestData = {
        phone: phone,
        // 다른 필요한 데이터를 여기에 추가합니다.
      };

      try {
        const response = await axios.post(`${BASE_URL}/api/v1/auth/phone/sms`, requestData, {
          withCredentials: true,
        });

        // SMS 전송 성공 시 phoneConfirm 모달을 화면 중앙으로 보내는 코드
        setPhoneConfirmVisible(true);
        setRequesterPhone(requesterPhoneNumber);
      } catch (error) {
        console.error("SMS 전송 중 오류 발생:", error);
        // SMS 전송 중 오류가 발생했을 때의 처리를 여기에 추가합니다.
      }
    }
  };

  return (
    <div>
      <div className="customreceivediv">
        <div className="custommodaltitle">
          <p>신청하기</p>
        </div>
        <div className="middlemodal">
          <div>
            <p className="minititle">신청자명</p>
            <input
              style={{ width: "60vw", height: "2rem" }}
              className="input"
              placeholder="이름을 입력해주십시오."
            />
            <p className="minititle">요청 사항</p>
            <input
              className="input"
              style={{ width: "60vw", height: "2rem" }}
              placeholder="요청 사항을 입력해주십시오."
            />
            <p className="minititle">은행명 :</p>
            <select
              className="input"
              style={{ width: "7rem", height: "2.5rem", borderRadius: "1vw" }}
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
            >
              <option value="">은행 선택</option>
              <option value="03">IBK기업은행</option>
              <option value="06">KB국민은행</option>
              <option value="07">SH수협은행</option>
              <option value="11">NH농협은행</option>
              <option value="20">우리은행</option>
              <option value="31">DGB대구은행</option>
              {/* <option value="32">부산은행</option> */}
              <option value="34">광주은행</option>
              <option value="37">전북은행</option>
              <option value="45">새마을금고</option>
              <option value="71">우체국예금보험</option>
              <option value="81">하나은행</option>
              <option value="88">신한은행</option>
            </select>
            {/* 은행명 드롭다운 끝 */}
            <p className="minititle">연락처</p>
            <div className="customgrid">
              <input className="input cinput" placeholder="연락처를 입력해주십시오." />
              {isSuc ? (
                <button className="button minibutton" onClick={handleSendSMS}>
                  확인
                </button>
              ) : (
                <button className="button minibutton" onClick={handleSendSMS}>
                  인증하기
                </button>
              )}
            </div>
            <p className="minititle">위임장 사진</p>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {uploadedFileName && <p>{uploadedFileName}</p>}
              <button
                className="button minibutton"
                style={{ marginTop: "1.5vh", marginLeft: "2vw" }}
                onClick={handleOpenFileInput}
              >
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
              <button className="button minibutton" onClick={handleOpenAddressModal}>
                주소찾기
              </button>
            </div>
            <p className="minititle">상세주소</p>
            <input
              style={{ width: "60vw", height: "2rem" }}
              className="input"
              placeholder="상세 주소를 입력해주십시오.(동 호수 포함)"
            />
            <div className="customgridx">
              <p className="minititle">사전 점검 가능 기간 :</p>
              <DatePicker
                dateFormat="yyyy.MM.dd"
                shouldCloseOnSelect
                minDate={new Date()}
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                withPortal
                className="datePicker"
              />
            </div>
            <p className="minititle">면적</p>
            <input
              style={{ width: "60vw", height: "2rem" }}
              className="input"
              placeholder="면적을 입력해주십시오."
            />
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
              확인
            </button>
            <Address
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              onSelect={handleInputAddress}
      

            />
          </div>
        )}
      </div>
      {phoneConfirmVisible && (
        <Phoneconfirm
          isSuc={isSuc}
          setIsSuc={setIsSuc}
          setPhoneConfirmVisible={setPhoneConfirmVisible}
          requesterPhoneNumber={requesterPhone}
        />
      )}
    </div>
  );
}

export default CustomreceiveModal;
