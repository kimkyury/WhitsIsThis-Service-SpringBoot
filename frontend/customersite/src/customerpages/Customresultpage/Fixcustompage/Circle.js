import React from "react";

function Circle() {
  const status = sessionStorage.getItem('status')
  return (
    <div className="circle">
      <p className="listline">대기 진행중 완료</p>
    </div>
  )
}

export default Circle;

status가 
WAITING_INSPECTION_DATE => 대기와 circle을 주황색과 중앙에 ✔넣기
WAITING_FOR_INSPECTION => 대기와 circle을 주황색과 중앙에 ✔넣기
IN_PROGRESS => 진행중과 circle을 주황색과 중앙에 ✔넣기
DONE => 완료와 circle을 주황색과 중앙에 ✔넣기