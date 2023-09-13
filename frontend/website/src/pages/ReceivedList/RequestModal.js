import React, { useState } from "react";
import './Receive.css';

function RequestModal() {
  const [consumer, setConsumer] = useState('홍길동');
  const [phonenumber, setPhonenumber] = useState('010-0000-0000');
  const [address, setAddress] = useState('부산광역시 강서구 녹산동');
  const request = '이렇게 저렇게 해주세요';
  const warrent = 'warrentUrl';
  const Daddress = ' 삼정그린코아 101동 103호';
  const [isModalOpen, setIsModalOpen] = useState(true); // 모달 열림 상태

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <div className="Modalbox" style={{ backgroundColor: 'white',zIndex:'999', display: 'flex', justifyContent: 'center' }}>
          <div>
            <div style={{ display: 'grid', justifyContent: ' grid-template-columns: 1fr 1fr' }}>
              <p className="modaltitlebox">
                신청내용
                <span onClick={closeModal}>✖</span>
              </p>
            </div>
            <div className="gridmodal">
              <div className="modalrebox">
                <p className="nametag">신청자명</p>
                <p className="Vtag">{consumer}</p>
                <p className="nametag">요청사항</p>
                <p className="Vtag">{request}</p>
                <p className="nametag">연락처</p>
                <p className="Vtag">{phonenumber}</p>
              </div>
              <div className="modalrebox" style={{borderLeft: '0.1vw solid black'}}>
                <p className="nametag" style={{ marginLeft: '5%' }}>위임장 사진</p>
                <p className='Vtag' style={{ marginLeft: '5%' }}>{warrent}</p>
                <p className="nametag" style={{ marginLeft: '5%' }}>주소</p>
                <p className="Vtag" style={{ marginLeft: '5%' }}>{address}</p>
                <p className="nametag" style={{ marginLeft: '5%' }}>상세주소</p>
                <p className='Vtag' style={{ marginLeft: '5%' }}>{Daddress}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RequestModal;
