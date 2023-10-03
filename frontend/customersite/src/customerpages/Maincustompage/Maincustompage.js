import React, { useState, useEffect } from "react";
import './Maincustompage.css';
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
// import Pdf from './Pdf';
import Header from '../../customcomponent/customheader/customheader';
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
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minDeviceWidth: 1224 });
    return isDesktop ? children : null;
  };

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxDeviceWidth: 1223 });
    return isMobile ? children : null;
  };

  return (
    <div>
    <Mobile>
    <div style={{       
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      // backgroundImage: `url(${process.env.PUBLIC_URL}/assets/배경사진.png)`
    }}
    className="roomimg fontb">
      <div className='cbox'>
      <p className={`logo-img ${logoVisible ? "show" : ""}`}>
          <img 
            src={`${process.env.PUBLIC_URL}/assets/logo_blue.png`} 
            alt="로고"
            style={{ height:'7rem'}} // 이미지를 가로 중앙으로 정렬
          />
        </p>
        <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center'}}>
          <Link  to={'/customerreceive'}>
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
          {/* <Pdf></Pdf> */}
        </div>
      </div>
{/* <p><img src={`${process.env.PUBLIC_URL}/assets/집2.jfif`}/></p> */}
    </div>
    </Mobile>
   
    <Desktop>
        <div className="roomimg fontb">
          <div className="desktop-diagonal-line">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 20 50 100" preserveAspectRatio="none">
            <path d="M20 20 C30 70, 170 20, 100 700 V0 H100 Z" fill="#2d4059" />
          </svg>
          </div>
          {/* <img
            src={`${process.env.PUBLIC_URL}/assets/집2.jfif`}
            alt="집 이미지"
            style={{
              height: '100%',
              position: 'absolute',
              left: '0',
              top: '0',
              zIndex: '1',
              width: '50vw'
            }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/assets/집3.jfif`}
            alt="집 이미지"
            style={{
              height: '100%',
              position: 'absolute',
              width: '50vw',
              right: '0',
              top: '0',
              zIndex: '1',
            }}
          /> */}
          <div className='cbox'>
            <p className={`logo-img ${logoVisible ? "show" : ""}`}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/logo_blue.png`}
                alt="로고"
                style={{ zIndex:'999', height:'7rem' }} // 이미지를 가로 중앙으로 정렬
              />
            </p>
            <div style={{ display:'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ zIndex:'999', display:'flex', alignItems:'center' }}>
                <Link  to={'/customerreceive'}>
                  <button style={{ zIndex:'999' }} className={`cmainbutton ${buttonsVisible ? "show" : ""}`}>
                    신청하기
                  </button>
                </Link>
                <Link to={'/resultconfirm'}>
                  <button style={{ marginLeft:'5vw', zIndex:'999' }} className={`cmainbutton ${buttonsVisible ? "show" : ""}`}>
                    결과확인
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Desktop>
    </div>
  )
}

export default CustomMain;

