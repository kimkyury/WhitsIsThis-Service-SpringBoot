import React, { useState, useEffect } from 'react';
import './ResultList.css';
import { ResultItem } from './ResultItem';
import ResultModal from './ResultModal';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Warning from '../../component/warning/warning';
import AuthHttp from '../../component/util/AuthHttp';

function ResultList() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [dataList, setDataList] = useState([]);
  const accessToken = sessionStorage.getItem('accessToken');
  const [isLogin, setIsLogin] = useState(false);
  const [showpdf, setShowpdf] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await AuthHttp({
        method: 'get',
        url: '/private/requests/done',
        params: {
          page: currentPage,
        },
      });

      if (Array.isArray(response.data.data)) {
        // If currentPage is 1, replace the dataList with the new data
        // Otherwise, append the new data to the existing dataList
        setDataList(currentPage === 1 ? response.data.data : [...dataList, ...response.data.data]);
      } else {
        console.error('데이터 형식이 배열이 아닙니다.');
      }
    } catch (error) {
      console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
    }
  };

  const handleItemClick = (itemData) => {
    setSelectedItem(itemData);
    setShowModal(true);
    // setShowpdf(itemdata)
    console.log(itemData)
  };

  useEffect(() => {
    if (accessToken) {
      fetchData();
      setIsLogin(true);
    }
    if (!isLogin) {
      // 사용자가 로그인하지 않은 경우 처리할 내용 추가
      // navigate(-1)
    }
  }, [currentPage]);

  const filteredData = Array.isArray(dataList)
    ? dataList.filter((item) =>
        Object.values(item).some((value) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchQuery.toLowerCase());
          }
          return false;
        })
      )
    : [];
    
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    isLogin ? (
      <div className='fontb' style={{ marginTop:'10vh', width: '77vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {/* 검색 필터 등을 추가할 수 있는 UI 요소 */}
        </div>
        <div style={{ marginTop: '3%' }} className='flexcenter'>
          <div className='relistforms'>
            <div style={{ height: '5vh' }} className='flexcenter'>
              <span className='listtitle relistdata'>
                신청자명
              </span>
              <span className='listtitle relistdata'>
                연락처
              </span>
              <span style={{ paddingLeft: '2%', justifyContent: 'flex-start' }} className='listtitle dataflex'>
                주소
              </span>
              <span className='listtitle relistdata'>
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
        <div style={{ marginTop: '2%' }} className='flexcenter'>
          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className='box'
              style={{ marginRight: '0.1vw' }}
            >
              이전
            </button>
            <span>{`${currentPage} / ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className='box'
              style={{ marginLeft: '0.1vw' }}
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
        <div className='resultlistinput' style={{ display: 'flex', alignItems: 'center', marginTop: '1%' }}>
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
    ) : (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
        <Warning />
      </div>
    )
  );
}

export default ResultList;
