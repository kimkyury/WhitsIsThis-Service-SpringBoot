import React from 'react';
import './ResultList.css';

export function ResultItem({ data, onClick }) {
  const handleClick = () => {
    onClick(data);
  };

  return (
    <div

      className='relist'
      onClick={handleClick}
    >
      <span  className='databox relistdata'>
        {data.consumer}
      </span>
      <span className='databox relistdata'>
        {data.phonenumber}
      </span>
      <span className='databox dataflex'>
        {data.address}
      </span>
      <span className='databox relistdata'>
        {data.finishdate}
      </span>
    </div>
  );
}
