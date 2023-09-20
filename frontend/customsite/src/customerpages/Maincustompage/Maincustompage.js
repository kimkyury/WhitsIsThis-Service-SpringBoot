import React from "react";
import './Maincustompage.css';
import { Link } from "react-router-dom";
function CustomMain() {
  return (
    <div style={{       
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundImage:`url(${process.env.PUBLIC_URL}/images/room.svg)`
      
      }}
      className="roomimg">
      <div className='cbox'>
      <div className="gridbuttonbox">
      
        <Link 
          to={'/CustomMain/Customreceive'}>
          <button className="cmainbutton">
          신청하기
          </button>
        </Link>
  
      
        <Link 
          to={'/CustomMain/Resultconfirm'}>
            <button className="cmainbutton">
            결과확인
            </button>
        </Link>

      </div>
    </div>
    </div>
  )
}

export default CustomMain;