import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import Header from "../customcomponent/customheader/customheader";
import Footer from '../customcomponent/customheader/footerdesk';
function WebMainC() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imagePaths = [
    "/assets/집2.jfif",
    "/assets/집사진.jfif",
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
    <div className='fontb' style={{height:'84vh'}}>
      <Header />
      <div  style={{ marginTop: '4vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src={currentImagePath}
          alt="집 이미지"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '999',
            marginLeft:'7vw',
            width: '60vw',
            height: '60vh',
            border: '1.5px solid black',
          }}
        />
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default WebMainC;
