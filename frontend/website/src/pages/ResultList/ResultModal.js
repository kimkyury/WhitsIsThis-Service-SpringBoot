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
    <div className="Modalbox" style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center' }}>
      <div>
      
        <p style={{ width: '51vw', borderRadius: '1.4vw', color: '#2D4059', height: '4.2vh', display: 'flex', justifyContent: 'space-between', fontSize: '1.6vw', fontWeight: 'bold' }}>
          <span style={{marginLeft:'1vw'}}>결과내용</span>
       
        <button onClick={closeModal} style={{display:'flex', color:'white', fontWeight:'bold', cursor: 'pointer',opacity:'90%', width:'3vw',backgroundColor:'#2D4059', height:'4vh',borderRadius:'0.6vw', fontSize: '0.8vw', justifyContent:'center',alignItems:'center', position: 'relative', zIndex: 1 }}>
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
