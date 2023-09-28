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
  } = data;

  return (
    <div className="recitembox fontb">
      <div className="recitemdiv">
        <span className="rectag">신청자명: {requesterName}</span>
        <span className="rectag">연락처: {requesterPhone}</span>
      </div>
      <span className="rectag">
        주소: {address} {addressDetail}
      </span>
      <span className="rectag">
        검사 시작일: {inspectionStart}
      </span>
      <span className="rectag">
        검사 종료일: {inspectionEnd}
      </span>
      <span className="rectag">신청 내용: {requestContent}</span>
    </div>
  );
}

export default Receiveditem;
