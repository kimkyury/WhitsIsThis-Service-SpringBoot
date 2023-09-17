import React, {useState} from 'react';

function Receiveditem({ data, onItemDoubleClick }) {
  const { consumer, phonenumber, address, Daddress } = data;

  return (
    <div
      className='recitembox'
      onDoubleClick={() => onItemDoubleClick(data)}
    >
      <div
        className='recitemdiv'
      >
        <span className='rectag'>
          신청자명: {consumer}
        </span>
        <span className='rectag'>
          연락처: {phonenumber}
        </span>
      </div>
      <span className='rectag'>주소: {address} {Daddress}</span>
    </div>
  );
}

export default Receiveditem;