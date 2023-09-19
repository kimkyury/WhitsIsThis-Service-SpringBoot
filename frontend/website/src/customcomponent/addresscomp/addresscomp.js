import React, { useState, useEffect, useRef } from "react";

function Addresscomp({ result, onSelect }) {
  const [showInputButton, setShowInputButton] = useState(false);
  const containerRef = useRef(null);

  const handleInputClick = () => {
    if (result) {
      onSelect(result);
    }
    setShowInputButton(false);
  };

  const handleCompClick = () => {
    setShowInputButton(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowInputButton(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="compbox" onClick={handleCompClick} ref={containerRef}>
      {result ? (
        <div style={{ display: "flex", alignItems: "center", height: "100%", marginTop: '2%' }}>
          <div>
            <p className="comptitlebox">전체 지번 주소: {result.address_name}</p>
            {result.road_address && (
              <div>
                <p className="comptitlebox">건물 이름: {result.road_address.building_name}</p>
                <p className="comptitlebox">우편번호: {result.road_address.zone_no}</p>
              </div>
            )}
          </div>
          {showInputButton && (
            <button onClick={handleInputClick}>입력하기</button>
          )}
        </div>
      ) : (
        <div className="compbox">주소 정보를 찾을 수 없습니다.</div>
      )}
    </div>
  );
}

export default Addresscomp;
