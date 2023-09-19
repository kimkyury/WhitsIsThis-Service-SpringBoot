import React, { useState } from "react";
import "./CustomreceiveModal.css";
import Calendar from "../../component/calendar/calendar";
import Address from "../addresscomp/address"; // 주소 컴포넌트 추가

function CustomreceiveModal() {
  const [showAddressModal, setShowAddressModal] = useState(false); // 주소 모달 표시 여부를 상태로 관리
  const [selectedAddress, setSelectedAddress] = useState(""); // 선택된 주소 데이터를 저장

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

  // '신청하기' 버튼 클릭 시 수행할 함수
  const handleApply = () => {
    // 선택된 주소를 활용하여 필요한 작업 수행
    console.log("선택된 주소:", selectedAddress);

    // 나머지 신청 로직을 작성
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
            style={{ width: "70vw", height: "4.6vh" }}
            className="input"
            placeholder="이름을 입력해주십시오."
          />
          <p className="minititle">요청 사항</p>
          <input
            className="input"
            style={{ width: "70vw", height: "8.1vh" }}
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
          <p className="minititle" style={{ width: "33.4vw", height: "4.6vh" }}>
            비밀번호
          </p>
          <input
            style={{ width: "70vw", height: "4.6vh" }}
            className="input"
            placeholder="비밀번호를 입력해주십시오."
          />

          <p className="minititle">위임장 사진</p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="button minibutton">찾아보기</button>
          </div>
          <p
            className="minititle"
            style={{ width: "33.4vw", height: "4.6vh" }}
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
            style={{ width: "70vw", height: "4.6vh" }}
            className="input"
            placeholder="상세 주소를 입력해주십시오.(동 호수 포함)"
          />
          <div className="customgridx">
            <p className="minititle">점검 예정 일자 :</p>
            <Calendar />
          </div>
        </div>
      </div>
      <div className="middlemodal">
        <button className="button bigbutton" onClick={handleApply}>
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
