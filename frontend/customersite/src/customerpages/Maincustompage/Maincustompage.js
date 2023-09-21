import React, { useState, useEffect } from "react";
import './Maincustompage.css';
import { Link } from "react-router-dom";

function CustomMain() {
  const [logoVisible, setLogoVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    // 로고 애니메이션 효과 시작 (1초 후)
    setTimeout(() => {
      setLogoVisible(true);
    }, 1000);

    // 버튼 애니메이션 효과 시작 (로고가 나타난 후 1초 뒤)
    setTimeout(() => {
      setButtonsVisible(true);
    }, 2500);
  }, []);

  return (
    <div style={{       
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',

       
      // backgroundImage: `url(${process.env.PUBLIC_URL}/assets/배경사진.png)`
    }}
    className="roomimg backgr">
      <div className='cbox'>
        <p className={`logo-img ${logoVisible ? "show" : ""}`}>
          <img src={`${process.env.PUBLIC_URL}/assets/로고사진누.png`} alt="로고" />
        </p>
        <div>
          <div className="gridbuttonbox">
            <Link to={'/customerreceive'}>
              <button className={`cmainbutton ${buttonsVisible ? "show" : ""}`}>
                신청하기
              </button>
            </Link>
            <Link to={'/resultconfirm'}>
              <button className={`cmainbutton ${buttonsVisible ? "show" : ""}`}>
                결과확인
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomMain;
