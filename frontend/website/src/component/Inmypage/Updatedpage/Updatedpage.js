import React from 'react';

function Updatedpage({ onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '42vw',
        height: '19vh',
        border: '0.05vw solid #2D4059',
        backgroundColor: 'white', // 모달 배경색 설정 (원하는 색상으로 변경 가능)
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '42vw',
          height: '4.3vh',
          borderBottom: '0.25vw solid #2D4059',
        }}
      >
        <span style={{ color: '#2D4059', fontSize: '1.6vw', fontWeight: 'bold', textAlign: 'center' }}>실명수정</span>
        <button
          onClick={onClose}
          style={{
            boxShadow: '0px 0px 0.15vw rgba(0, 0, 0, 0.3)',
            fontWeight: 'bold',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '3vw',
            height: '4.6vh',
            backgroundColor: '#2D4059',
            fontSize: '2vw',
            textAlign: 'center',
          }}
        >
          ✖
        </button>
      </div>

      <p
        style={{
          marginTop: '5%',
          width: '42vw',
          fontSize: '1.4vw',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          marginRight: '0.5vw',
          alignItems: 'center',
        }}
      >
        <span style={{ marginLeft: '0.1vw' }}>이름 :</span>
        <input
          style={{
            boxShadow: '0px 0.25vw 0px rgba(0, 0, 0, 0.3)',
            width: '23vw',
            border: 'none',
            backgroundColor: '#ECF0F3',
            borderRadius: '0.04vw',
            height: '4.6vh',
          }}
        />
        <button
          style={{
            marginRight: '1vw',
            fontSize: '0.7vw',
            boxShadow: '0px 0.1vw 0px rgba(0, 0, 0, 0.3)',
            width: '5vw',
            height: '2.8vh',
            fontWeight: 'bold',
            backgroundColor: '#ECF0F3',
            border: 'none',
            borderRadius: '0.04vw',
            color: '#2D4059',
          }}
        >
          실명수정
        </button>
      </p>
    </div>
  );
}

export default Updatedpage;
