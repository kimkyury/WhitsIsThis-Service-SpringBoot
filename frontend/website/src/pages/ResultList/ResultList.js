import React, { useState } from 'react';
import './ResultList.css';
import { ResultItem } from './ResultItem';

function ResultList() {
  const DataList = [
    {
      consumer: '홍길동',
      phonenumber: '010-0000-0000',
      address: '부산 강서구 녹산동 송정 삼정 그린코아 101동 101호',
      finishdate: '2023-09-13',
    },
    {
      consumer: '홍길은',
      phonenumber: '010-0000-0001',
      address: '부산 강동구 강동',
      finishdate: '2023-09-15',
    },
    {
      consumer: '홍길금',
      phonenumber: '010-0001-0002',
      address: '부산 강북구 강북',
      finishdate: '2023-09-18',
    },
    {
      consumer: '홍길플',
      phonenumber:'020-0003-0004',
      address: '부산 강남구 강남',
      finishdate: '2023-09-23',
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = DataList.filter((item) =>
    Object.values(item).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <input
          style={{
            marginTop: '2%',
            marginRight: '5%',
            borderRadius: '0.3vw',
            textAlign: 'center',
          }}
          placeholder="검색..."
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
      <div style={{marginTop:'3%', display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            paddingTop: '1%',
            paddingBottom: '1%',
            borderBottom: 'solid 0.01vw black',
            borderTop: 'solid 0.15vw black',
            width: '90vw',
            height: '5vh',
            display: 'flex',
            justifyContent: 'space-between',
            textAlign: 'start',
            height: '100%',
            marginBottom:'2%'
          }}
        >
          <span style={{ flex: '1', marginLeft: '5%' }} className='listtitle'>
            신청자명
          </span>
          <span style={{ flex: '1', marginLeft:'-6%' }} className='listtitle'>
            연락처
          </span>
          <span style={{ flex: '1' }} className='listtitle'>
            주소
          </span>
          <span style={{ flex: '1', marginLeft:'10%'}} className='listtitle'>
            점검완료일자
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ borderBottom: '0.01vw solid black', width: '80vw', height: '60vh' }}>
          {filteredData.map((v, idx) => (
            <ResultItem data={v} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResultList;
