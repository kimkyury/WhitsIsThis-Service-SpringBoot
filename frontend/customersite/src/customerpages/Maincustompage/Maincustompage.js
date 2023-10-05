import React, { useState, useEffect } from "react";
import './Maincustompage.css';
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import Header from '../../customcomponent/customheader/customheader';
import WebMainC from "../WebMainC";
import '../login.css';

function CustomMain() {
  const [logoVisible, setLogoVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 이미지 인덱스

  // 이미지 파일 경로 목록
  const imagePaths = [
    "/assets/house1.jpg",
    "/assets/house2.jpg",
    // "/assets/집8.svg",
    // "/assets/house0.svg",
    // "/assets/image (75).png",
    "/assets/house3.jpg",
    "/assets/mapping.gif",
    // "/assets/방사진.svg"
    // "/assets/방.svg",
    // "/assets/방사진.svg",
  ];

  useEffect(() => {
    // 로고 애니메이션 효과 시작 (1초 후)
    setTimeout(() => {
      setLogoVisible(true);
    }, 1000);

    // 버튼 애니메이션 효과 시작 (로고가 나타난 후 1초 뒤)
    setTimeout(() => {
      setButtonsVisible(true);
    }, 2500);

    // 5초마다 이미지 변경
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % imagePaths.length;
        if (nextIndex === 0) {
          // 다음 인덱스가 0인 경우, 처음으로 돌아가기
          return 0;
        } else {
          return nextIndex;
        }
      });
    }, 5000);

    // 컴포넌트 언마운트 시 clearInterval로 인터벌 제거
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minDeviceWidth: 901 });
    return isDesktop ? children : null;
  };

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxDeviceWidth: 900 });
    return isMobile ? children : null;
  };

  const currentImagePath = imagePaths[currentImageIndex];
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

    className="roomimg fontb" >
                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <img
            // src={currentImagePath}
            src={`${process.env.PUBLIC_URL}${currentImagePath}`}
            alt="집 이미지"
            style={{
              height: '100%',
              position: 'absolute',
              left: '0',
              top: '0',
              zIndex: '999',
              marginLeft:'7vw',
              marginTop:'32vh',
              width: '86vw',
              height:'25vh',
              // borderRadius:'4vw',
              // boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.4)',
              // border:'1.5px solid black',
            }}
          />
          </div>
      <div className='cbox'>
      <p className={`logo-img ${logoVisible ? "show" : ""}`}>
          <img 
            src={`${process.env.PUBLIC_URL}/assets/logo_blue.png`} 
            alt="로고"
            style={{ height:'7rem', zIndex:'999'}} // 이미지를 가로 중앙으로 정렬
          />
        </p>
        <div className="buttonbox2" style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{ marginTop:'25rem', zIndex:'999', opacity:'0.8', display:'flex', alignItems:'center', gap:'1rem'}}>
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
    <div className='fontb' style={{height:'84vh'}}>
      <Header />
      <div  style={{ marginTop: '4vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
    
          src={`${process.env.PUBLIC_URL}${currentImagePath}`}
          alt="집 이미지"
          style={{
            position: 'absolute',
            left: '51%',
            top: '42%',
            transform: 'translate(-50%, -50%)',
            zIndex: '999',
            marginLeft:'7vw',
            width: '75vw',
            height: '75vh',
            
            border: '1.5px solid black',
          }}
        />
      </div>
      {/* <Footer/> */}
    </div>
        {/* <div className="roomimg fontb">
          <div className="desktop-diagonal-line">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-13 0 50 100" preserveAspectRatio="none" width="100VW" height="100vh" >
            <path d="M10 0 C15 180, 50 -500,50 4000 V0 H100 Z" fill="#6EC5FF" />
          </svg>
         
          </div>
          <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <img
            src={currentImagePath}
            alt="집 이미지"
            style={{
              height: '100%',
              position: 'absolute',
              left: '0',
              top: '0',
              zIndex: '999',
              marginLeft:'15vw',
              marginTop:'5vh',
              width: '70vw',
              height:'40vh',
              border:'1.5px solid black',
            }}
          />
          </div>
          <div>
          <img
            src={currentImagePath}
            alt="집 이미지"
            style={{
              height: '100%',
              position: 'absolute',
              width: '15vw',
              height: '25vh',
              right: '-50',
              top: '0',
              zIndex: '999',
              marginTop: '30vh',
              marginLeft: '16%',
              border: '2px solid black',
            }}
          />
          </div>
          <div className='cbox'>
            <p className={`logo-img ${logoVisible ? "show" : ""}`}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/logo_blue.png`}
                alt="로고"
                style={{ zIndex:'999', height:'7rem' }} // 이미지를 가로 중앙으로 정렬
              />
            </p>
            <div style={{ display:'flex', flexDirection: 'column', alignItems: 'center' }}>
             
              <div style={{marginTop:'20vh', zIndex:'999', display:'flex', alignItems:'center' }}>
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
        </div> */}
      </Desktop>
    </div>
  )
}

export default CustomMain;

