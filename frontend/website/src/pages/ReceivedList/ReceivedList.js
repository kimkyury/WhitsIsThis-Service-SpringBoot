import React, { useState, useEffect, useRef } from 'react';
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

  const [applicant, setApplicant] = useState([]);
  const [myApplicant, setMyApplicant] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const getRefreshToken = () => {
    return sessionStorage.getItem('refreshToken');
  };

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

  const fetchData = (page, endpoint) => {
    setIsFetching(true);

    const refreshToken = getRefreshToken();

    const headers = {
      'Authorization': `${refreshToken}`,
    };

    fetch(`${BASE_URL}/api/v1/private/requests/${endpoint}?page=${page}`, {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          const responseData = data.data;
          setMyApplicant((prevData) =>
            page === 1 ? responseData : [...prevData, ...responseData]
          );

          // Check if there are more pages to fetch
          if (data.hasNextPage) {
            const nextPage = page + 1;
            fetchData(nextPage, endpoint);
          } else {
            setIsFetching(false);
          }
        } else {
          console.error('API 오류:', data.message);
          setIsFetching(false);
          console.log(refreshToken);
        }
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
        setIsFetching(false);
      });
  };

  useEffect(() => {
    fetchData(currentPage, 'waiting');
  }, []);

  // Attach a scroll event listener to the "접수대기" div
  const applicantContainerRef = useRef(null);

  const handleApplicantScroll = () => {
    const element = applicantContainerRef.current;
    if (
      element.scrollHeight - element.scrollTop === element.clientHeight &&
      !isFetching &&
      !loadingMore
    ) {
      const nextPage = currentPage + 1;
      fetchData(nextPage, 'waiting');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleApplicantScroll);
    return () => {
      window.removeEventListener('scroll', handleApplicantScroll);
    };
  }, [currentPage, isFetching, loadingMore]);

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
                    <Draggable key={data.id.toString()} draggableId={data.id.toString()} index={index}>
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
                <div
                  ref={applicantContainerRef}
                  onScroll={handleApplicantScroll}
                  className="Dropbox myApplicant-container"
                  style={{ paddingTop: '1.5vw' }}
                >
                  <Droppable droppableId="myApplicant">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="myApplicant-container"
                      >
                        {myApplicant.map((data, index) => (
                          <Draggable key={data.id.toString()} draggableId={data.id.toString()} index={index}>
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
      {loadingMore && <div>Loading...</div>}
    </div>
  );
}

export default List;
