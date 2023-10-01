import React, { useState, useEffect, useRef } from 'react';
import './Receive.css';
import Item from './Receiveditem';
import RequestModal from './RequestModal';
import { FaSearch } from 'react-icons/fa';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Warning from '../../component/warning/warning';
import axios from 'axios';

function List() {
  const [showModal, setShowModal] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [applicant, setApplicant] = useState([]);
  const [myApplicant, setMyApplicant] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const getRefreshToken = () => {
    return sessionStorage.getItem('accessToken');
  };
  const accessToken = getRefreshToken();

  const handleItemClick = (itemData) => {
    setSelectedItem(itemData);
    setShowModal(true);
  };

  const filteredData = applicant.filter((data) =>
    Object.values(data).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    setMyApplicant([]);
  }, [currentPage]);

  const fetchData = (page, endpoint) => {
    setIsFetching(true);

    const headers = {
      'Authorization': `${accessToken}`,
    };

    axios.get(`${BASE_URL}/api/v1/private/requests/${endpoint}?page=${page}`, {
      headers: headers,
    })
      .then((response) => {
        const data = response.data;
        if (data.status === 200) {
          const responseData = data.data;
          const uniqueData = responseData.filter((newData) => {
            return !myApplicant.some((existingData) => existingData.id === newData.id);
          });

          setMyApplicant((prevData) =>
            page === 1 ? uniqueData : [...prevData, ...uniqueData]
          );

          if (data.hasNextPage) {
            setCurrentPage(page + 1);
          } else {
            setIsFetching(false);
          }
        } else {
          console.error('API 오류:', data.message);
          setIsFetching(false);
        }
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
        setIsFetching(false);
      });
  };

  useEffect(() => {
    fetchData(currentPage, 'waiting');
  }, [currentPage]);

  const applicantContainerRef = useRef(null);
  const myApplicantContainerRef = useRef(null);

  const handleApplicantScroll = () => {
    const element = applicantContainerRef.current;
    if (
      element &&
      element.scrollHeight - element.scrollTop === element.clientHeight &&
      !isFetching
    ) {
      const nextPage = currentPage + 1;
      fetchData(nextPage, 'waiting');
    }
  };

  useEffect(() => {
    const element = applicantContainerRef.current;
    if (element) {
      element.addEventListener('scroll', handleApplicantScroll);
      return () => {
        element.removeEventListener('scroll', handleApplicantScroll);
      };
    }
  }, [currentPage, isFetching]);

  useEffect(() => {
    if (accessToken) {
      fetchData(1, 'waiting');
      setIsLogin(true);
    }
  }, []);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (
      result.source.droppableId === 'applicant' &&
      result.destination.droppableId === 'myApplicant'
    ) {
      const draggedData = applicant[sourceIndex];

      setMyApplicant((prevMyApplicant) => {
        const updatedMyApplicant = [...prevMyApplicant];
        updatedMyApplicant.splice(destinationIndex, 0, draggedData);
        return updatedMyApplicant;
      });

      const updatedApplicant = [...applicant];
      updatedApplicant.splice(sourceIndex, 1);
      setApplicant(updatedApplicant);

      // 패치 요청 보내기
      sendPatchRequest(draggedData.id);
    } else if (
      result.source.droppableId === 'myApplicant' &&
      result.destination.droppableId === 'applicant'
    ) {
      const draggedData = myApplicant[sourceIndex];

      const updatedApplicant = [...applicant];
      updatedApplicant.splice(destinationIndex, 0, draggedData);
      setApplicant(updatedApplicant);

      const updatedMyApplicant = [...myApplicant];
      updatedMyApplicant.splice(sourceIndex, 1);
      setMyApplicant(updatedMyApplicant);

      // 패치 요청 보내기
      sendPatchRequest(draggedData.id);
    }
  }

  // 패치 요청을 보내는 함수
  const sendPatchRequest = (itemId) => {
    if (itemId) {
      const patchUrl = `${BASE_URL}/api/v1/private/requests/${itemId}/manager`;

      const headers = {
        'Authorization': `${accessToken}`,
      };

      // 업데이트할 데이터를 요청 본문에 포함
      const requestData = {
        // 업데이트할 데이터의 필드 및 값
        // 예: fieldName: updatedValue
      };

      axios.patch(patchUrl, requestData,
        {params: {
          id: itemId,
        },},
        { headers })
        .then((response) => {
          const data = response.data;
          if (data.status === 200) {
            // 패치 요청이 성공하면 처리할 내용을 추가
            console.log('패치 요청이 성공했습니다.');
          } else {
            console.error('API 오류:', data.message);
          }
        })
        .catch((error) => {
          console.error('패치 요청 오류:', error);
        });
    }
  };

  return (
    isLogin ? (
      <div className='fontb' style={{ marginTop: '7vh' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div className="inputgrid">
            <input
              className="recinputtag"
              placeholder="검색"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <p className="iconsearch">
              <FaSearch />
            </p>
          </div>
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="gridbox">
            <div className="left">
              <span className="recspan">내 접수</span>
              <Droppable droppableId="applicant" ref={applicantContainerRef}>
                {(provided) => (
                  <div
                    className="Dropbox"
                    style={{ paddingTop: '1.5vw' }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {filteredData.map((data, index) => (
                      <Draggable
                        key={data.id.toString()}
                        draggableId={data.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            onClick={() => handleItemClick(data)}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            style={{
                              ...provided.draggableProps.style,
                              position: snapshot.isDragging ? 'fixed' : 'relative',
                              zIndex: snapshot.isDragging ? 2000 : 'auto',
                              opacity: snapshot.isDragging ? 0.5 : 1,
                            }}
                          >
                            <Item data={data} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <div className="left" style={{ marginLeft: '2vw' }}>
              <span className="recspan">접수대기</span>
              <Droppable droppableId="myApplicant" ref={myApplicantContainerRef}>
                {(provided) => (
                  <div
                    className="Dropbox myApplicant-container"
                    style={{ paddingTop: '1.5vw' }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {myApplicant.map((data, index) => (
                      <Draggable
                        key={data.id.toString()}
                        draggableId={data.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            onClick={() => handleItemClick(data)}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            style={{
                              ...provided.draggableProps.style,
                              position: snapshot.isDragging ? 'fixed' : 'relative',
                              zIndex: snapshot.isDragging ? 2000 : 'auto',
                              opacity: snapshot.isDragging ? 0.5 : 1,
                            }}
                          >
                            <Item data={data} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
        {showModal && (
          <div className="modal-container">
            <RequestModal selectedItem={selectedItem} setShowModal={setShowModal} />
          </div>
        )}
      </div>
    ) : (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
        <Warning />
      </div>
    )
  );
}

export default List;
