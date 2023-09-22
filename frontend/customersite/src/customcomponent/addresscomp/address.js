import React, { useState, useEffect, useRef } from "react";
import "./address.css";
import Addresscomp from "./addresscomp";
import axios from "axios";

function Address({selectedAddress, setSelectedAddress}) {
  const [searchText, setSearchText] = useState(""); // Input field value
  const [searchResults, setSearchResults] = useState([]); // Search results
  const [showAddressModal, setShowAddressModal] = useState(false); // 주소 모달 표시 여부를 상태로 관리
  
  // 검색어 입력 필드에서 Enter 키를 눌렀을 때 검색 실행
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = async () => {
    const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
    // const KAKAO_API = process.env.REACT_APP_KAKAO_API;
    try {
      // Replace 'YOUR_KAKAO_API_KEY_HERE' with your actual Kakao API key
      const apiUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${searchText}`;
      const headers = {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      };

      // Send a GET request to Kakao API
      const response = await axios.get(apiUrl, { headers });

      // Update the search results with the data from the response
      setSearchResults(response.data.documents);
    } catch (error) {
      console.error("Error while making API request:", error);
    }
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
        {/* <button onClick={handleSearch}>검색</button> */}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p className="searchbox">총 검색 건수: {searchResults.length}건</p>
      </div>
      <div className="divdiv">
        {/* Map over search results and render Addresscomp for each item */}
        <div>
          {searchResults.map((result, index) => (
            <Addresscomp
              key={index}
              result={result}
              onSelect={handleInputAddress}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            ></Addresscomp>
          ))}
        </div>
      </div>

      {/* 주소 모달 */}
      {showAddressModal && (
        <div className="address-modal">
          <button className="close-button" onClick={() => setShowAddressModal(false)}>
            닫기
          </button>
          <Address onSelect={handleInputAddress} />
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
