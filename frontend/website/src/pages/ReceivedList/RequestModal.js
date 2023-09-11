import React, {useState} from "react";

function RequestModal() {
  const [consumer, setConsumer] = useState('홍길동');
  const [phonenumber, setPhonenumber] = useState('010-0000-0000')
  const [address, setAddress] = useState('부산광역시 강서구 녹산동 삼정그린코아 101동 103호')
  return (
    <div>
      <p>신청내용</p>
      <div>
      <div>
        <p>신청자명</p>
        <p>{consumer}</p>
        <p>요청사항</p>
        <p>연락처</p>

      </div>
      <div>
        <p>위임장 사진</p>
        <p>주소</p>
        <p>상세주소</p>
      </div>
    </div>
    </div>
  )
}
export default RequestModal;

//값을 item에서 가져올지 아니면 axios처리를 할지