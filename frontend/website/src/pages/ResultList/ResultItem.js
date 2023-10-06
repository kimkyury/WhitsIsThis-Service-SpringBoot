import React from 'react';
import './ResultList.css';

export function ResultItem({ data, onClick }) {
  const handleClick = () => {
    onClick(data);
  };
  // console.log(data)
  // inspectionEnd 데이터가 존재하는 경우에만 배열의 각 요소를 문자열로 변환하고 "/"로 합칩니다.
  const formattedInspectionEnd = data.inspectionEnd
  ? data.inspectionEnd.slice(0, 3).join('/') // 배열의 처음 3개 요소를 선택하여 문자열로 변환 후 "/"로 합칩니다.
  : '';

// console.log('formattedInspectionEnd:', formattedInspectionEnd);

  return (
    <div className='relist fontb' onClick={handleClick}>
      <span className='databox relistdata'>
        {data.requesterName}
      </span>
      <span className='databox relistdata'>
        {data.requesterPhone}
      </span>
      <span className='databox dataflex'>
        {data.address} {data.addressDetail}
      </span>
      <span className='databox relistdata'>
        {data.requestedAt.slice(0, 3).join('/')}
      </span>
    </div>
  );
}
