import React from 'react';
import Item from './Receiveditem';
import './Receive.css';
function List() {
  return (
    <div>접수목록
      <hr/>
      <div className='gridbox'>
        <div className='left' style={{  boxShadow:'0px 5px 5px rgba(0,0,0,0.5)'}}>
          <span style={{display:'flex', alignItems:'center', height: '100%', marginLeft:'3%'}}>
          접수대기
          </span>
          <div style={{marginTop:'3%', paddingTop:'5px',width: '45vw', height:'70vh' , backgroundColor:'whitesmoke', borderRadius:'8px'}}>
          <p style={{justifyContent:'center'}}>
          <Item/>
          {/* 아이템 더블클릭하면 모달나오게 */}
          <Item/>
          <Item/>
          </p>
          </div>
        </div>
        <div className='left' style={{  boxShadow:'0px 5px 5px rgba(0,0,0,0.5)'}}>
        <span style={{display:'flex', alignItems:'center', height: '100%', marginLeft:'3%'}}>
          내 접수
          </span>
        </div>
      </div>
      {/* <Item/> */}
    </div>
  )
}

export default List;

//신청자명 => requester_name
//신청자 연락처 => requester_phone
//주소 => address + adress_detail

