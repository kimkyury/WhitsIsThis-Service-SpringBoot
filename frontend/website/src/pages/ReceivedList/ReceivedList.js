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
  const [myApplicant, setMyApplicant] = useState([]); // 추가: 내 접수 리스트

  const handleItemDoubleClick = (itemData) => {
    setSelectedItem(itemData);
    setShowModal(true);
  };

  // 검색어와 데이터를 비교하여 일치하는 결과만 필터링
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
      // 아이템을 접수 리스트에서 내 접수 리스트로 이동
      setMyApplicant((prevMyApplicant) => {
        const updatedMyApplicant = [...prevMyApplicant];
        updatedMyApplicant.splice(destinationIndex, 0, applicant[sourceIndex]);
        return updatedMyApplicant;
      });

      // 아이템을 접수 대기 리스트에서 제거
      const updatedApplicant = [...applicant];
      updatedApplicant.splice(sourceIndex, 1);
      setApplicant(updatedApplicant);
    } else if (result.source.droppableId === 'myApplicant' && result.destination.droppableId === 'applicant') {
      // 아이템을 내 접수 리스트에서 접수 대기 리스트로 이동
      const updatedApplicant = [...applicant];
      updatedApplicant.splice(destinationIndex, 0, myApplicant[sourceIndex]);
      setApplicant(updatedApplicant);

      // 아이템을 내 접수 리스트에서 제거
      const updatedMyApplicant = [...myApplicant];
      updatedMyApplicant.splice(sourceIndex, 1);
      setMyApplicant(updatedMyApplicant);
    }
  }
  // axios받으면 updated => post 접수대기 제거 => 접수대기 컴포넌트에 item delete 끝나면 useEffect로 get호출 
  // but, 너무 딱딱하거나 렌더링이 안된다면 callback으로 호출
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '8fr 1fr', marginRight: '2%', alignItems: 'center' }}>
          <input
            style={{
              display: 'flex',
              marginTop: '2%',
              marginRight: '5%',
              borderRadius: '0.3vw',
              textAlign: 'center',
              border: '4px solid #F07B3F',
              width: '10vw',
              height: '3vh',
            }}
            placeholder="검색"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <p style={{
            display: 'flex',
            backgroundColor: 'orange',
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
        </div>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='applicant'>
          {(provided) => (
            <div className="gridbox">
              {/* 접수대기 */}
              <div className="left" style={{ boxShadow: '0px 0.25vw 0.25vw rgba(0,0,0,0.5)' }}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    marginLeft: '3%',
                  }}
                >
                  접수대기
                </span>
                <div
                  style={{
                    marginTop: '3%',
                    paddingTop: '0.25vw',
                    width: '46vw',
                    height: '62vh',
                    backgroundColor: 'whitesmoke',
                    borderRadius: '0.4vw',
                  }}
                >
                  <p style={{ justifyContent: 'center' }} {...provided.droppableProps} ref={provided.innerRef}>
                    {filteredData.map((data, index) => (
                      <Draggable key={data.id} draggableId={data.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            style={{
                              ...provided.draggableProps.style,
                              // 아이템이 드래그되면 디브태그 뒤로 숨겨진 상태로 나오도록 설정
                              position: snapshot.isDragging ? 'fixed' : 'relative',
                              zIndex: snapshot.isDragging ? 1000 : 'auto',
                            }}
                          >
                            <Item data={data} onItemDoubleClick={handleItemDoubleClick} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </p>
                </div>
              </div>

              {/* 내 접수 */}
              <div className="left" style={{ boxShadow: '0px 0.25vw 0.25vw rgba(0,0,0,0.5)' }}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    marginLeft: '3%',
                  }}
                >
                  내 접수
                </span>
                <div
                  style={{
                    marginTop: '3%',
                    paddingTop: '1.5vw',
                    width: '46vw',
                    height: '62vh',
                    backgroundColor: 'whitesmoke',
                    borderRadius: '0.4vw',
                  }}
                >
                  <Droppable droppableId='myApplicant'>
                    {(provided) => (
                      <div  {...provided.droppableProps} ref={provided.innerRef}>
                        {myApplicant.map((data, index) => (
                          <Draggable  key={data.id} draggableId={data.id} index={index}>
                            {(provided, snapshot) => (
                              <div  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                              style={{
       
                                ...provided.draggableProps.style,
                                // 아이템이 드래그되면 디브태그 뒤로 숨겨진 상태로 나오도록 설정
                                position: snapshot.isDragging ? 'fixed' : 'relative',
                                zIndex: snapshot.isDragging ? 1000 : 'auto',
                              }}>
                                <Item data={data} onItemDoubleClick={handleItemDoubleClick} />
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