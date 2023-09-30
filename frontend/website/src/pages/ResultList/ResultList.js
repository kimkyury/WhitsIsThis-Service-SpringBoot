import React, { useState, useEffect } from 'react';
import './ResultList.css';
import { ResultItem } from './ResultItem';
import ResultModal from './ResultModal';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Warning from '../../component/warning/warning';

function ResultList() {
  // 모달 표시 상태와 선택된 항목을 관리하는 State
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // 검색어와 현재 페이지 번호를 관리하는 State
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // API로부터 받아온 데이터를 관리하는 State
  const [dataList, setDataList] = useState([]);

  // 사용자 로그인 상태와 API 요청에 필요한 Access Token을 관리하는 State
  const accessToken = sessionStorage.getItem('accessToken');
  const [isLogin, setIsLogin] = useState(false);

  // React Router의 navigate 함수를 사용하기 위한 객체
  const navigate = useNavigate();

  // API에서 데이터를 가져오는 함수
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/private/requests/done`,
        {
          params: {
            page: 1,
          },
          headers: {
            'Authorization': accessToken,
          },
        }
      );

      if (Array.isArray(response.data.data)) {
        setDataList(response.data.data);
        setCurrentPage(1);
      } else {
        console.error('데이터 형식이 배열이 아닙니다.');
      }
    } catch (error) {
      console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
    }
  };

  // 항목을 클릭했을 때 모달을 표시하는 함수
  const handleItemClick = (itemData) => {
    setSelectedItem(itemData);
    setShowModal(true);
  };

  // 컴포넌트가 로드될 때 데이터를 가져오고 사용자가 로그인한 경우 isLogin 상태를 설정
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

  // 검색어에 따라 데이터를 필터링하는 함수
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

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // 현재 페이지에서 보여줄 항목의 범위 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // 검색어 입력 시 현재 페이지를 1로 설정
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  // 데이터 변경 또는 현재 페이지 변경 시 페이지를 조정하는 useEffect
  useEffect(() => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [dataList, currentPage]);

  // 페이지 변경 함수
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
