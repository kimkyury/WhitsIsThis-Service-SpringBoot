import React from "react";
import './Receive.css';

function RequestModal({ selectedItem, setShowModal }) {
  if (!selectedItem) {
    return null;
  }

  const { consumer, phonenumber, address, request, warrent, Daddress } = selectedItem;

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="Modalbox" >
      <div>
        <div>
          <p className="recmodalform" >
            <span className="recfspan">신청내용</span>
            <button onClick={closeModal} className="recmodalbutton">
          <span style={{textAlign:'center'}}>닫기</span>
        </button>
          </p>
          <div className="gridmodal">
            <div className="nameVtagv">
              <p className="nametag" style={{  width:'5.3vw' }}>신청자명</p>
              <p className="Vtag vtag">{consumer}</p>
              <p className="nametag" style={{  width:'10vw' }}>요청사항</p>
              <p className="Vtag vtag" >{request}</p>
              <p className="nametag" style={{  width:'10vw' }}>연락처</p>
              <p className="Vtag vtag" >{phonenumber}</p>
            </div>
            <div style={{ borderLeft: '0.1vw solid black', width: '26vw', height: '37vh' }}>
              <p className="nametag" style={{  width:'10vw' }}>위임장 사진</p>
              <p className='Vtag tagv' >{warrent}</p>
              <p className="nametag" style={{  width:'10vw' }}>주소</p>
              <p className="Vtag tagv" >{address}</p>
              <p className="nametag" style={{  width:'10vw' }}>상세주소</p>
              <p className='Vtag tagv' >{Daddress}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default RequestModal;
