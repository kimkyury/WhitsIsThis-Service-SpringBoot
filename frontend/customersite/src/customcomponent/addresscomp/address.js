import React, { useState, useEffect, useRef } from "react";
import "./address.css";
import Addresscomp from "./addresscomp";
import axios from "axios";

function Address({ selectedAddress, setSelectedAddress}) {
  const [searchText, setSearchText] = useState(""); // 입력 필드 값
  const [searchResults, setSearchResults] = useState([]); // 검색 결과
  const [showAddressModal, setShowAddressModal] = useState(false); // 주소 모달 표시 여부

  // Enter 키를 눌렀을 때 검색 실행
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  
    if (!searchText) {
      console.error("검색어를 입력하세요.");
      return;
    }
  
    try {
      // 검색어를 사용자가 입력한 searchText로 설정
      const query = searchText;
  
      const apiUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(query)}`;
      const headers = {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      };
  
      // Kakao API에 GET 요청 보내기
      const response = await axios.get(apiUrl, { headers });
  
      // 응답 데이터로 검색 결과 업데이트
      setSearchResults(response.data.documents);
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      if (error.response) {
        console.error("API 응답 데이터:", error.response.data); // API 응답 데이터 로그에 출력
      }
    }
  };

  // 주소 선택 및 "입력하기" 버튼 클릭 시 호출되는 함수
  const handleInputAddress = (address) => {
    // 주소 객체에서 필요한 정보 추출하여 문자열로 변환
    const formattedAddress = `${address.address_name} ${
      address.road_address && address.road_address.building_name
        ? `- ${address.road_address.building_name}`
        : ""
    }`;
    setSelectedAddress(formattedAddress);
    setShowAddressModal(false); // 모달 닫기
  };

  // 검색어가 변경될 때마다 검색 실행
  useEffect(() => {
    handleSearch();
  }, [searchText]);

  return (
    <div className="addressbox">
      <p className="addresstitle">주소 검색</p>
      <div className="divdiv">
        <input
          className="textinput"
          placeholder="주소 찾기"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={handleKeyPress} // Enter 키 이벤트 처리
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p className="searchbox">총 검색 건수: {searchResults.length}건</p>
      </div>
      <div className="divdiv">
        {/* 검색 결과를 매핑하고 각 항목에 대해 Addresscomp를 렌더링합니다 */}
        <div style={{maxHeight:'55vh', overflowY:'auto'}}>
          {searchResults.map((result, index) => (
            <Addresscomp
              key={index}
              result={result}
              onSelect={handleInputAddress}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              setShowAddressModal={setShowAddressModal} // setShowAddressModal 함수 전달
            />
          ))}
        </div>
      </div>

      {/* 주소 모달 */}
      {showAddressModal && (
        <div className="address-modal">
          <button className="button minibutton" 
          style={{
              backgroundColor: 'white',
              border: '1px solid #2D4059',
              fontWeight: 'bold',
              opacity: '70%',
          }} onClick={() => setShowAddressModal(false)}>
            X
          </button>
          <Address showAddressModal={showAddressModal} setShowAddressModal={setShowAddressModal} onSelect={handleInputAddress} />
        </div>
      )}

      {/* 선택된 주소 데이터를 입력 필드에 표시 */}
      {selectedAddress && (
        <div className="selected-address">
          <p>최근 선택된 주소: {selectedAddress}</p>
        </div>
      )}
    </div>
  );
}

export default Address;
