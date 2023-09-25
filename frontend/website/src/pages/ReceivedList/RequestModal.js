import React from 'react';
import './Receive.css';

function RequestModal({ selectedItem, setShowModal }) {
  if (!selectedItem) {
    return null;
  }

  const {
    requesterName,
    requesterPhone,
    address,
    addressDetail,
    inspectionStart,
    inspectionEnd,
    requestContent,
  } = selectedItem;

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="Modalbox">
      <div>
        <div>
          <p className="recmodalform">
            <span className="recfspan">신청내용</span>
            <button onClick={closeModal} className="recmodalbutton">
              <span style={{ textAlign: 'center' }}>닫기</span>
            </button>
          </p>
          <div className="gridmodal">
            <div className="nameVtagv">
              <p className="nametag" style={{ width: '10vw' }}>
                신청자명
              </p>
              <p className="Vtag vtag">{requesterName}</p>
              <p className="nametag" style={{ width: '10vw' }}>
                요청사항
              </p>
              <p className="Vtag vtag">{requestContent}</p>
              <p className="nametag" style={{ width: '10vw' }}>
                연락처
              </p>
              <p className="Vtag vtag">{requesterPhone}</p>
              </div>
              <div>
              <p className="nametag" style={{ width: '10vw' }}>
                주소
              </p>
              <p className="Vtag vtag">
                {address} {addressDetail}
              </p>
              <p className="nametag" style={{ width: '10vw' }}>
                검사 시작일
              </p>
              <p className="Vtag vtag">{inspectionStart}</p>
              <p className="nametag" style={{ width: '10vw' }}>
                검사 종료일
              </p>
              <p className="Vtag vtag">{inspectionEnd}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestModal;
