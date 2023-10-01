import React, { useState, useEffect } from "react";
import './customheader.css'
function CustomHeader() { // 컴포넌트 이름을 대문자로 변경
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
    <div className='customheadersdiv'>
      <p className={`logo-img ${logoVisible ? "show" : ""}`}>
          <img 
            src={`${process.env.PUBLIC_URL}/assets/로고사진누.png`} 
            alt="로고"
            style={{ width:'5rem', height:'5rem', marginTop:'-13vh' }} // 이미지를 가로 중앙으로 정렬
          />
        </p>
      {/* <div className="customheaders">
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
          </NavLink> */}
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
          {/* <NavLink
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
        </div> */}

    </div>
  );
}

export default CustomHeader;