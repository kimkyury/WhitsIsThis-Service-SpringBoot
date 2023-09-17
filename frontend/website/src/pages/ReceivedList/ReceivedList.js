import React, { useState } from 'react';
import './Receive.css';
import Item from './Receiveditem';
import RequestModal from './RequestModal';
import { FaSearch } from "react-icons/fa";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function List() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [applicant, setApplicant] = useState([
    {
      id: '1',
      consumer: '홍길동',
      phonenumber: '010-0000-0000',
      address: '부산광역시 강서구 녹산동',
      request: '이렇게 저렇게 해주세요',
      warrent: 'warrentUrl',
      Daddress: '삼정그린코아 101동 103호',
    },
    {
      id: '2',
      consumer: '홍길은',
      phonenumber: '010-0100-0000',
      address: '부산광역시 강북구 강북동',
      request: '이렇게 저렇게 해주세요',
      warrent: 'warrentUrl',
      Daddress: '삼정그린코아 1201동 1203호',
    },
    {
      id: '3',
      consumer: '홍길금',
      phonenumber: '010-0100-0000',
      address: '부산광역시 강북구 강북동',
      request: '이렇게 저렇게 해주세요',
      warrent: 'warrentUrl',
      Daddress: '삼정그린코아 1201동 1203호',
    },
  ]);
  const [myApplicant, setMyApplicant] = useState([]);

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

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const draggedItem = result.draggableId;
    
    if (result.source.droppableId === 'applicant' && result.destination.droppableId === 'myApplicant') {
      const draggedData = applicant[sourceIndex];
    
      setMyApplicant((prevMyApplicant) => {
        const updatedMyApplicant = [...prevMyApplicant]; // 복사하여 수정
        updatedMyApplicant.splice(destinationIndex, 0, draggedData); // 드래그된 데이터를 목적지 인덱스에 추가
        return updatedMyApplicant;
      });
    
      const updatedApplicant = [...applicant];
      updatedApplicant.splice(sourceIndex, 1);
      setApplicant(updatedApplicant);
    }
     else if (result.source.droppableId === 'myApplicant' && result.destination.droppableId === 'applicant') {
      const draggedData = myApplicant[sourceIndex];
      
      const updatedApplicant = [...applicant];
      updatedApplicant.splice(destinationIndex, 0, draggedData); // 드래그된 데이터를 목적지 인덱스에 추가
      setApplicant(updatedApplicant);
  
      const updatedMyApplicant = [...myApplicant];
      updatedMyApplicant.splice(sourceIndex, 1);
      setMyApplicant(updatedMyApplicant);
    }
  }
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div className='inputgrid'>
          <input
            className='recinputtag'
            placeholder="검색"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <p className='iconsearch'>
            <FaSearch />
          </p>
        </div>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='applicant'>
          {(provided) => (
            <div className="gridbox">
              <div className="left">
                <span
                  className='recspan'
                >
                  접수대기
                </span>
                <div
                  className='Dropbox'
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
                <span
                  className='recspan'
                >
                  내 접수
                </span>
                <div
                  className='Dropbox'
                  style={{ paddingTop: '1.5vw' }}
                >
                  <Droppable droppableId='myApplicant'>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className='myApplicant-container'
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

export default List;