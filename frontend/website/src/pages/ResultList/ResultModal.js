import React from "react";
import Pdf from '../WebMain/Pdf';
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
          <Pdf/>
          <p>zip다운로드</p>
        </div>
      </div>


    </div>
  );
}

export default ResultModal;
