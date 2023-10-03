import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Login from '../../component/Login/Login';
import FirstLogin from '../../component/Login/firstLogin';
import './login.css';
import Footer from '../../component/Header/Footer/footer';
function WebMain() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imagePaths = [
    "/assets/집2.jfif",
    // "/assets/집1.jpg",
    "/assets/집3.jfif",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % imagePaths.length;
        if (nextIndex === 0) {
          return 0;
        } else {
          return nextIndex;
        }
      });
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const currentImagePath = imagePaths[currentImageIndex];

  return (
    <div className=' fontb'>
      <div className='loginform' style={{ marginTop: '4vh', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src={currentImagePath}
            alt="집 이미지"
            style={{
              position: 'absolute',
              left: '50%', // 가로 중앙 정렬을 위해 50%로 설정
              top: '50%', // 세로 중앙 정렬을 위해 50%로 설정
              transform: 'translate(-50%, -50%)', // 이미지 중앙 정렬
              zIndex: '999',
              width: '60vw',
              height: '60vh',
              border: '1.5px solid black',
            }}
          />
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default WebMain;