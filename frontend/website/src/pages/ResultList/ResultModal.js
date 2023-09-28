import React from "react";

function ResultModal({ selectedItem, setShowModal }) {
  if (!selectedItem) {
    return null;
  }

  const { consumer, phonenumber, address, finishdate } = selectedItem;

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="Modalbox flexcenter fontb" style={{ backgroundColor: 'white' }}>
      <div>
      
        <p className="resmodalform">
          <span style={{marginLeft:'1vw'}}>결과내용</span>
       
        <button onClick={closeModal} className="resclosebutton">
          <span style={{textAlign:'center'}}>닫기</span>
        </button>
      
 
        </p>
      
        <div>
          결과화면입니다.(PDF)
          <p>신청자명: {consumer}</p>
          <p>연락처: {phonenumber}</p>
          <p>주소: {address}</p>
          <p>점검완료일자: {finishdate}</p>
        </div>
      </div>


    </div>
  );
}

export default ResultModal;
