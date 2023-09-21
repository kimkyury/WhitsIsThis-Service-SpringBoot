import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './customheader.css'

function customHeader(props) {
  return (
    <div className='customheadersdiv'>
      <div className="customheaders">
          <NavLink
            to={`/`}
            className='customheader'
          >
            홈
          </NavLink>
          <NavLink
            to={`/customerreceive`}
            className='customheader'
          >
            신청페이지
          </NavLink>
          <NavLink
            to={`/fixcustom`}
            className='customheader'
          >
            점검결과
          </NavLink>
          {/* <NavLink
            to={`/CustomMain/Moneyreturn`}
            className='customheader'
          >
            환불페이지
          </NavLink>
          <NavLink
            to={`/CustomMain/Moneywait`}
            className='customheader'
          >
            입금대기
          </NavLink> */}
          <NavLink
            to={`/receiveresult`}
            className='customheader'
          >
            신청결과
          </NavLink>
          <NavLink
            to={`/resultconfirm`}
            className='customheader'
          >
            결과확인
          </NavLink>
        </div>

    </div>
  );
}

export default customHeader;