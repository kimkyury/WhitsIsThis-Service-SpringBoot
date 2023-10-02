import React from 'react';

function Receivedsitem({ mydata}) {
  const {
    requests,
    address,

    
  } = mydata;


  
  // console.log(mdata)
  // {mydata && mydata.map((mydata, mdata) => (
  //   <Receivedsitem mydata={mydata} mdata={mydata.requests}/>
  //   ))}
  return (
    <div className="recitembox fontb">
      <div className="recitemdiv">
        <span className="rectag">{requests[0].id} 신청자명: {requests[0].requestName}</span>
        <span className="rectag">연락처: {requests[0].requestPhone}</span>
      </div>
      <span className="rectag">
        주소: {address} {requests[0].addressDetail}
      </span>
      {/* <span className="rectag">
        검사 예정일: {inspectionStart} ~ {inspectionEnd}
      </span> */}
      
      <p style={{marginTop:'0.7vh'}} className="rectag">신청 내용: {requests[0].requestContent}</p>
    </div>
  );
}

export default Receivedsitem;
