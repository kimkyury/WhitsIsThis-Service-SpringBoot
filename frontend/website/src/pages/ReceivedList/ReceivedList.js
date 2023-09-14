import React, { useState } from 'react';
import './Receive.css';
import Item from './Receiveditem';
import RequestModal from './RequestModal';
import { FaSearch } from "react-icons/fa";
function List() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleItemDoubleClick = (itemData) => {
    setSelectedItem(itemData);
    setShowModal(true);
  };

  const datas = [
    {
      consumer: '홍길동',
      phonenumber: '010-0000-0000',
      address: '부산광역시 강서구 녹산동',
      request: '이렇게 저렇게 해주세요',
      warrent: 'warrentUrl',
      Daddress: '삼정그린코아 101동 103호',
    },
    {
      consumer: '홍길은',
      phonenumber: '010-0100-0000',
      address: '부산광역시 강북구 강북동',
      request: '이렇게 저렇게 해주세요',
      warrent: 'warrentUrl',
      Daddress: '삼정그린코아 1201동 1203호',
    },
  ];

  // 검색어와 데이터를 비교하여 일치하는 결과만 필터링
  const filteredData = datas.filter((data) =>
    Object.values(data).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', alignItems:'center'}}>
        
      <input
        style={{
          display:'flex',
          marginTop: '2%',
          marginRight: '5%',
          borderRadius: '0.3vw',
          textAlign: 'center',
          border: '4px solid #F07B3F',
          width:'10vw',
          height:'3vh',
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
        alignItems: 'center', // 세로 중앙 정렬을 위해 추가
        justifyContent: 'center', // 가로 중앙 정렬을 위해 추가
      }}>
        <FaSearch />
      </p>
      </div>
      </div>
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
            <p style={{ justifyContent: 'center' }}>
              {filteredData.map((data, index) => (
                <Item key={index} data={data} onItemDoubleClick={handleItemDoubleClick} />
              ))}
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
              zIndex:'-1'
            }}
          >
            내 접수
          </span>
          <div
            style={{
              marginTop: '3%',
              paddingTop: '0.25vw',
              width: '46vw',
              height: '62vh',
              backgroundColor: 'whitesmoke',
              borderRadius: '0.4vw',
              zIndex:'-1'
            }}
          ></div>
        </div>
      </div>

      {showModal && (
        <div className="modal-container">
          <RequestModal selectedItem={selectedItem} setShowModal={setShowModal} />
        </div>
      )}
    </div>
  );
}

export default List;
