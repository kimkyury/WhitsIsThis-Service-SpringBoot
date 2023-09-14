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
    <div className="Modalbox" style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center' }}>
      <div>
        <div>
          <p style={{ width: '51vw', borderRadius: '1.4vw', color: '#2D4059', height: '4.2vh', display: 'flex', justifyContent: 'space-between', fontSize: '1.6vw', fontWeight: 'bold' }}>
            <span style={{marginLeft:'1vw', borderBottom:'2px solid #2D4059', height:'5vh'}}>신청내용</span>
            <button onClick={closeModal} style={{display:'flex', color:'white', fontWeight:'bold', cursor: 'pointer',opacity:'90%', width:'3vw',backgroundColor:'#2D4059', height:'4vh',borderRadius:'0.6vw', fontSize: '0.8vw', justifyContent:'center',alignItems:'center', position: 'relative', zIndex: 1 }}>
          <span style={{textAlign:'center'}}>닫기</span>
        </button>
          </p>
          <div className="gridmodal">
            <div style={{ border: '0.1vw solid black', width: '26vw', border: 'none', height: '37vh' }}>
              <p className="nametag" style={{ marginLeft: '5%',borderBottom:'2px solid black', width:'5.3vw' }}>신청자명</p>
              <p className="Vtag" style={{ marginLeft: '5%', borderBottom:'2px dashed black', width:'20vw'  }}>{consumer}</p>
              <p className="nametag" style={{ marginLeft: '5%',borderBottom:'2px solid black', width:'10vw' }}>요청사항</p>
              <p className="Vtag" style={{ marginLeft: '5%', borderBottom:'2px dashed black', width:'20vw' }}>{request}</p>
              <p className="nametag" style={{ marginLeft: '5%',borderBottom:'2px solid black', width:'10vw' }}>연락처</p>
              <p className="Vtag" style={{ marginLeft: '5%', borderBottom:'2px dashed black', width:'20vw' }}>{phonenumber}</p>
            </div>
            <div style={{ borderLeft: '0.1vw solid black', width: '26vw', height: '37vh' }}>
              <p className="nametag" style={{ marginLeft: '5%',borderBottom:'2px solid black', width:'10vw' }}>위임장 사진</p>
              <p className='Vtag' style={{ marginLeft: '5%', borderBottom:'2px solid black', width:'20vw' }}>{warrent}</p>
              <p className="nametag" style={{ marginLeft: '5%',borderBottom:'2px solid black', width:'10vw' }}>주소</p>
              <p className="Vtag" style={{ marginLeft: '5%', borderBottom:'2px solid black', width:'20vw' }}>{address}</p>
              <p className="nametag" style={{ marginLeft: '5%',borderBottom:'2px solid black', width:'10vw' }}>상세주소</p>
              <p className='Vtag' style={{ marginLeft: '5%', borderBottom:'2px solid black', width:'20vw' }}>{Daddress}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default RequestModal;
