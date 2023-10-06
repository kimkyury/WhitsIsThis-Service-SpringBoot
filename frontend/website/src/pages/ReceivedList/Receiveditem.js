import React from 'react';

function Receiveditem({ data }) {
  const {
    requesterName,
    requesterPhone,
    address,
    addressDetail,
    inspectionStart,
    inspectionEnd,
    requestContent,
    id,
  } = data;

  return (
    <div className="recitembox fontb">
      <div className="recitemdiv">
        <span className="rectag">{id} 신청자명: {requesterName}</span>
        <span className="rectag">연락처: {requesterPhone}</span>
      </div>
      <span className="rectag">
        주소: {address} {addressDetail}
      </span>
      {/* <span className="rectag">
        검사 예정일: {inspectionStart} ~ {inspectionEnd}
      </span> */}
      
      <p style={{marginTop:'0.7vh'}} className="rectag">신청 내용: {requestContent}</p>
    </div>
  );
}

export default Receiveditem;
