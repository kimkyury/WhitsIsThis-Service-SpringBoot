import React, {useState} from "react";
import './Receive.css';
function RequestModal() {
  const [consumer, setConsumer] = useState('홍길동');
  const [phonenumber, setPhonenumber] = useState('010-0000-0000')
  const [address, setAddress] = useState('부산광역시 강서구 녹산동')
  const request = '이렇게 저렇게 해주세요';
  const warrent = 'warrentUrl';
  const Daddress = ' 삼정그린코아 101동 103호';
  return (
    <div className="Modalbox" style={{ display: 'flex', justifyContent: 'center'}}>
      <div>
        <p style={{ width: '1700px', border: '2px solid #2D4059',boxShadow:'0px 3px 0px rgba(0, 0, 0, 0.5)', borderRadius: '25px', color: '#2D4059', height: '63px', display: 'flex', justifyContent: 'center', fontSize: '50px', fontWeight: 'bold' }}>신청내용</p>
        <div className="gridmodal">
          <div style={{ border: '2px solid black', width: '814.16px', border:'none', height: '373px' }}>
            <p className="nametag">신청자명</p>
            <p className="Vtag">{consumer}</p>
            <p className="nametag">요청사항</p>
            <p className="Vtag">{request}</p>
            <p className="nametag">연락처</p>
            <p className="Vtag">{phonenumber}</p>
          </div>
          <div style={{borderLeft: '2px solid black', width: '814.16px', height: '600px' }}>
            <p className="nametag" style={{marginLeft:'5%'}}>위임장 사진</p>
            <p className='Vtag' style={{marginLeft:'5%'}}>{warrent}</p>
            <p className="nametag" style={{marginLeft:'5%'}}>주소</p>
            <p className="Vtag" style={{marginLeft:'5%'}}>{address}</p>
            <p className="nametag" style={{marginLeft:'5%'}}>상세주소</p>
            <p className='Vtag' style={{marginLeft:'5%'}}>{Daddress}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RequestModal;

//값을 item에서 가져올지 아니면 axios처리를 할지