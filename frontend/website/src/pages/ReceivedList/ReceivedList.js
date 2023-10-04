import React, { useState, useEffect, useRef } from 'react';
import './Receive.css';
import Item from './Receiveditem';
import RequestModal from './RequestModal';
import { FaSearch } from 'react-icons/fa';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Warning from '../../component/warning/warning';
import axios from 'axios';
import AuthHttp from '../../component/util/AuthHttp';
import Receivedsitem from './Myreceiveitem';
import RequestModals from './MyRequestModal';
import Calendar from '../../component/calendar/calendar';
function List() {
  const [insdate, setInsdate] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [applicant, setApplicant] = useState([]);
  const [myApplicant, setMyApplicant] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [mydata, setMydata] = useState(null);
  const [mdata, setMdata] = useState(null);
  const [showcal, setShowcal] = useState(false);
  const [selectDate, setSelectDate] = useState();
  const [selectedDatemax, setSelectedDatemax] = useState();
  const getRefreshToken = () => {
    return sessionStorage.getItem('accessToken');
  };
  const accessToken = getRefreshToken();

  const handleItemClick = (itemData) => {
    setSelectedItem(itemData);
    setShowModal(true);

  };

  const handleItemClicks = (itemData) => {
    setSelectedItems(itemData);
    setShowModals(true);

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
    getData(currentPage);
  }, [currentPage]);


  useEffect(() => {
  
  getData(1)
  fetchMyData();
  }, []);
  
  const fetchMyData =  async() => {
    try {
      const response = await AuthHttp({
        method:'get',
        url:`/private/requests/assigned`
      })
      console.log(response.data)
      console.log(response.data.data[0].requests[0])
      setMydata(response.data.data)
      console.log(response.data.data)
      // setMdata(response.data.data.requests)
    } catch(e) {
      console.error(e)
    }
  }
  // console.log(mydata)
  const getData = async(page)=>{

    try{
      const response = await AuthHttp({
        method:'get',
        url:`/private/requests/waiting?page=${page}`
      })
      console.log(response.data.data); 
      const data = response.data
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
    }catch(e){
      console.error(e);
    }

  }

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
      getData(nextPage, 'waiting');
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
      getData(1, 'waiting');
      setIsLogin(true);
    }
  }, []);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
  
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
  
    // 소스와 대상 드롭 컨테이너가 모두 "applicant"인지 확인합니다.
    if (result.source.droppableId === 'applicant' && result.destination.droppableId === 'applicant') {
      // "applicant" 컨테이너 내에서 항목을 이동할 수 없도록 합니다.
      return;
    }
  
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
      moveItem(draggedData.id);
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
      setShowcal(true)
      // 패치 요청 보내기
      setSelectDate(draggedData.inspectionStart)
      setSelectedDatemax(draggedData.inspectionEnd)
      // console.log(draggedData.inspectionEnd, draggedData.inspectionEnd)
      console.log(draggedData);
      moveItem(draggedData.id);
    }
  }
  // 패치 요청을 보내는 함수

  const moveItem = async (targetId) =>{
    try{
      // const currentDate = new Date();
      // const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

      const response = await AuthHttp({
        method:'patch',
        url:`/private/requests/${targetId}/manager`,
        data:{
          // 자바스크립트 date 함수로 저걸 포매팅해서 보내면 됨
          inspectionDate: insdate
        }
      });
      console.log(insdate)
      // console.log(formattedDate)
      setShowcal(false)
      console.log(response);
    }catch(e){
      console.error(e);
      console.log(insdate)
      
    }
  }

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
                    <div >
                    {mydata && mydata.map((mydata, mdata) => (
                      <span onClick={() => handleItemClicks(mydata)} ><Receivedsitem   mydata={mydata} mdata={mydata.requests}/></span>
                      ))}
                      </div>
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
         {showModals && (
          <div className="modal-container">
            <RequestModals selectedItems={selectedItems} setShowModals={setShowModals} />
          </div>
        )}
         {showcal && (
       
            <Calendar 
            setInsdate={setInsdate} 
            selectdate={selectDate} 
            selectedDatemax={selectedDatemax} 
            setShowcal={setShowcal} 
            selectedDate={selectedDate} 
            setSelectedDate={setSelectedDate} 
            insdate={insdate}
            />
       
        )}
        {/* showcal는 내 접수 넘어가쓸때 true하고 selectedItem, setshowcal, datainspectionstart, end */}
      </div>
    ) : (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
        <Warning />
      </div>
    )
  );
}

export default List;
