import React, {useState} from 'react';

function Receiveditem({ data, onItemDoubleClick }) {
  const { consumer, phonenumber, address, Daddress } = data;

  return (
    <div
      style={{
        boxShadow: '0px 0.25vw 0.25vw rgba(0, 0, 0, 0.5)',
        width: '45vw',
        height: '16vh',
        borderLeft: '0.25vw solid #F07B3F',
        marginTop: '1%',
        marginLeft: '1%',
        backgroundColor: 'white',
        color: 'black',
      }}
      onDoubleClick={() => onItemDoubleClick(data)}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginRight: '2%',
        }}
      >
        <span style={{ marginLeft: '2%', fontSize: '1vw', marginTop: '6%' }}>
          신청자명: {consumer}
        </span>
        <span style={{ marginRight: '2%', fontSize: '1vw', marginTop: '6%' }}>
          연락처: {phonenumber}
        </span>
      </div>
      <span style={{ marginLeft: '2%', fontSize: '1vw' }}>주소: {address} {Daddress}</span>
    </div>
  );
}

export default Receiveditem;