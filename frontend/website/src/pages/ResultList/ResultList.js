import React, { useState, useEffect } from 'react';
import './ResultList.css';
import { ResultItem } from './ResultItem';
import ResultModal from './ResultModal';
import { FaSearch } from 'react-icons/fa';
function ResultList() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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
    },
        {
      consumer: '홍길플',
      phonenumber:'020-0003-0004',
      address: '부산 강남구 강남',
      finishdate: '2023-09-23',
    },
    {
      consumer: '홍길플',
      phonenumber:'020-0003-0004',
      address: '부산 강남구 강남',
      finishdate: '2023-09-23',
    },
    {
      consumer: '홍길플',
      phonenumber:'020-0003-0004',
      address: '부산 강남구 강남',
      finishdate: '2023-09-23',
    },
    {
      consumer: '홍길플',
      phonenumber:'020-0003-0004',
      address: '부산 강남구 강남',
      finishdate: '2023-09-23',
    },
    {
      consumer: '홍길플',
      phonenumber:'020-0003-0004',
      address: '부산 강남구 강남',
      finishdate: '2023-09-23',
    },
    {
      consumer: '홍길플',
      phonenumber:'020-0003-0004',
      address: '부산 강남구 강남',
      finishdate: '2023-09-23',
    },
    {
      consumer: '홍길플',
      phonenumber:'020-0003-0004',
      address: '부산 강남구 강남',
      finishdate: '2023-09-23',
    }
  ];
  const handleItemClick = (itemData) => {
    setSelectedItem(itemData);
    setShowModal(true);
  };

  // filteredData를 계산하기 전에 DataList를 사용할 수 있도록 위치를 변경
  const filteredData = DataList.filter((item) =>
    Object.values(item).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

 
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // 현재 페이지에 표시할 아이템 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // 검색어 변경시 현재 페이지를 첫 페이지로 리셋
  };

  useEffect(() => {
    // filteredData가 변경될 때 현재 페이지가 유효한지 확인
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredData, currentPage, totalPages]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      </div>
      <div style={{ marginTop: '3%' }} className='flexcenter'>
        <div
          className='relistforms'
        >
          <div style={{  height: '5vh' }} className='flexcenter'>
            <span className='listtitle relistdata'>
              신청자명
            </span>
            <span className='listtitle relistdata'>
              연락처
            </span>
            <span style={{ paddingLeft: '2%',  justifyContent: 'flex-start'}} className='listtitle dataflex'>
              주소
            </span>
            <span  className='listtitle relistdata'>
              점검완료일자
            </span>
          </div>
        </div>
      </div>
      <div className='flexcenter'>
        <div className='itemresult'>
          {currentItems.map((v, idx) => (
            <ResultItem data={v} key={idx} onClick={handleItemClick} />
          ))}
        </div>
      </div>
      {/* 페이지네이션 컨트롤 */}
      <div style={{ marginTop: '2%'}} className='flexcenter'>
        <div>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className='box'
            style={{marginRight:'0.1vw'}}
          >
            이전
          </button>
          <span>{`${currentPage} / ${totalPages}`}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className='box'
            style={{marginLeft:'0.1vw'}}
          >
            다음
          </button>
        </div>
      </div>
      {showModal && (
        <div className="modal-container">
          <ResultModal selectedItem={selectedItem} setShowModal={setShowModal} />
        </div>
      )}
      <div className='resultlistinput'>
        <div>
          <input
            className='relistinput'
            placeholder="검색"
            value={searchQuery}
            onChange={handleInputChange}
          />
          {/* <div style={{
            // height: '3vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '5.5vh',
            
          }}>
            <p style={{
              display: 'flex',
              marginLeft: '5%',
              width: '1.5vw',
              height: '1.5vw',
              borderRadius: '50%',
              color: '#2D4059',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <FaSearch />
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ResultList;