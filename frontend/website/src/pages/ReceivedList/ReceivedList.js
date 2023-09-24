import React, { useState, useEffect } from 'react';
import './Receive.css';
import Item from './Receiveditem';
import RequestModal from './RequestModal';
import { FaSearch } from 'react-icons/fa';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function List() {
  const [showModal, setShowModal] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [applicant, setApplicant] = useState([
    // 초기 데이터 예시
    // ...
  ]);
  const [myApplicant, setMyApplicant] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleItemClick = (itemData) => {
    setSelectedItem(itemData);
    setShowModal(true);
  };

  const filteredData = applicant.filter((data) =>
    Object.values(data).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchData = (page) => {
    setIsLoading(true);
    // API 엔드포인트에서 지정된 페이지의 데이터를 가져옵니다.
    fetch(`${BASE_URL}/api/v1/private/requests/waiting?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 0) {
          // 데이터가 정상적으로 반환되었을 때만 처리합니다.
          const responseData = data.data;
          
          // 가져온 데이터로 myApplicant 상태를 업데이트합니다.
          setMyApplicant((prevData) => [...prevData, ...responseData]);
  
          setCurrentPage(page);
          setIsLoading(false);
        } else {
          console.error('API 오류:', data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    // 컴포넌트가 마운트될 때 초기 페이지의 데이터를 가져옵니다.
    fetchData(currentPage);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !isLoading
    ) {
      const nextPage = currentPage + 1;
      fetchData(nextPage);
    }
  };

  useEffect(() => {
    // 스크롤 이벤트 리스너를 등록합니다.
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, isLoading]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const draggedItem = result.draggableId;

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
    }
  }

  return (
    <div>
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
        <Droppable droppableId="applicant">
          {(provided) => (
            <div className="gridbox">
              <div className="left">
                <span className="recspan">내 접수</span>
                <div
                  className="Dropbox"
                  style={{ paddingTop: '1.5vw' }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {filteredData.map((data, index) => (
                    <Draggable key={data.id} draggableId={data.id} index={index}>
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
              </div>
              <div className="left">
                <span className="recspan">접수대기</span>
                <div className="Dropbox" style={{ paddingTop: '1.5vw' }}>
                  <Droppable droppableId="myApplicant">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="myApplicant-container"
                      >
                        {myApplicant.map((data, index) => (
                          <Draggable key={data.id} draggableId={data.id} index={index}>
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
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {showModal && (
        <div className="modal-container">
          <RequestModal selectedItem={selectedItem} setShowModal={setShowModal} />
        </div>
      )}
    </div>
  );
}

export default List
