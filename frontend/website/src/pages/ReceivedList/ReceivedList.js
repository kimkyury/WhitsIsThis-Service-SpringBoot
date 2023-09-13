import React, { useState } from 'react';
import Item from './Receiveditem';
import RequestModal from './RequestModal';
import './Receive.css';

function List() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemDoubleClick = () => {
    // You can set the selectedItem state here
    setSelectedItem(/* Data related to the selected item */);

    // Show the modal
    setShowModal(true);
  };

  return (
    <div>
      접수목록
      <hr />
      <div className="gridbox">
        <div
          className="left"
          style={{ boxShadow: '0px 0.25vw 0.25vw rgba(0,0,0,0.5)' }}
        >
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
            className='receibox'
          >
            <p style={{ justifyContent: 'center' }}>
              <Item onItemDoubleClick={handleItemDoubleClick} />
              <Item onItemDoubleClick={handleItemDoubleClick} />
              <Item onItemDoubleClick={handleItemDoubleClick} />
            </p>
          </div>
        </div>
        <div
          className="left"
          style={{ boxShadow: '0px 0.25vw 0.25vw rgba(0,0,0,0.5)' }}
        >
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
            className='receibox'
         
          ></div>
        </div>
      </div >
      {showModal && (
        <RequestModal selectedItem={selectedItem} setShowModal={setShowModal} />
      )}
    </div>
  );
}

export default List;