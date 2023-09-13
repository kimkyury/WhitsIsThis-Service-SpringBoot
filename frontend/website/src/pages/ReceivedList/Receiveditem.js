import React, { useState } from 'react';

function Receiveditem({ onItemDoubleClick }) {
  const [consumer, setConsumer] = useState('홍길동');
  const [phonenumber, setPhonenumber] = useState('010-0000-0000');
  const [address, setAddress] = useState(
    '부산광역시 강서구 녹산동 삼정그린코아 101동 103호'
  );

  return (
    <div
      style={{
        boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.5)',
        width: '45vw',
        height: '16vh',
        borderLeft: '0.25vw solid #F07B3F',
        marginTop: '1%',
        marginLeft: '1%',
        backgroundColor: 'white',
        color: 'black',
      }}
      onDoubleClick={onItemDoubleClick}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginRight: '2%',
        }}
      >
        <span className='itemif' style={{ marginTop: '2%' }}>
          신청자명 : {consumer}
        </span>
        <span className='itemif' style={{marginTop: '2%' }}>
          연락처 : {phonenumber}
        </span>
      </div>
      <span className='itemif'>주소 : {address}</span>
    </div>
  );
}

export default Receiveditem;