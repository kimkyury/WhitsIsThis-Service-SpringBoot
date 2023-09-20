import React, { useState } from "react";
import { Link} from "react-router-dom";
import './Resultconfirm.css';

function Resultconfirm() {
  const [customdata, setCustomdata] = useState([
    {
      cunsumer: '홍길동',
      phonenumber: '01012345678',
      request: '이렇게 저렇게 해주세요',
      password: '1234',
      warrent: 'warrenturl',
      address: '부산 강서구',
      daddress: '송정그린코아',
      startdate: '2023-09-19',
      enddate: '2023-10-18',
      state: 'waiting',
    },
    {
      cunsumer: '홍길은',
      phonenumber: '01012345555',
      request: '이렇게 저렇게 해주세요',
      password: '1234',
      warrent: 'warrenturl',
      address: '부산 강서구',
      daddress: '송정그린코아',
      startdate: '2023-09-19',
      enddate: '2023-10-18',
      state: 'startfor',
    },
    {
      cunsumer: '홍길금',
      phonenumber: '01012345555',
      request: '이렇게 저렇게 해주세요',
      password: '1234',
      warrent: 'warrenturl',
      address: '부산 강서구',
      daddress: '송정그린코아',
      startdate: '2023-09-19',
      enddate: '2023-10-18',
      state: 'finishfor',
    },
  ]);

  // 전화번호 입력 상태와 버튼 상태를 관리하는 상태 변수 추가
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handlePhoneNumberVerification = () => {
    // 입력된 전화번호와 데이터의 전화번호 비교
    const matchingData = customdata.find((data) => data.phonenumber === phoneNumberInput);

    if (matchingData) {
      // 일치하는 데이터가 있을 경우 버튼 상태 변경
      setIsVerified(true);
    } else {
      alert("전화번호가 일치하지 않습니다.");
    }
  };

  const handleConfirmation = () => {
    if (isVerified) {
      const matchingData = customdata.find((data) => data.phonenumber === phoneNumberInput);
      if (matchingData && matchingData.state === 'waiting') {
        // waiting 상태일 때만 페이지 이동
        // 리액트 라우터의 Link 컴포넌트를 사용하여 결과 페이지로 이동
        // to 속성에 이동할 경로를 지정
        // 예: '/CustomMain/Receiveresult'
        // 여기서는 경로를 설정하고 Link 컴포넌트를 렌더링하여 이동합니다.
        // 페이지 이동을 수행하지 않도록 조건 추가
        alert("신청 결과 페이지로 이동합니다.");
        // 여기서 페이지 이동을 하지 않고, 실제 이동을 원할 때
        // 리액트 라우터의 history.push('/CustomMain/Receiveresult')를 사용하여 이동할 수 있습니다.
    
      } else {
        alert("상태가 대기 중이 아닙니다.");
      }
    } else {
      alert("전화번호 인증이 필요합니다.");
    }
  };

  return (
    <div className="roomimg resrecpage" style={{backgroundImage:`url(${process.env.PUBLIC_URL}/images/room.svg)`}}>
      <div className="customreceivedivconfirm">
        <div className="custommodaltitle ">
          <p>결과확인</p>
        </div>
        <div className="middlemodalsx">
          <div className="customgrid">
            <input
              className="input cinput"
              placeholder="연락처를 입력해주십시오."
              value={phoneNumberInput}
              onChange={(e) => setPhoneNumberInput(e.target.value)}
            />
            <button
              className="button minibutton"
              style={{ marginLeft: '3%' }}
              onClick={handlePhoneNumberVerification}
            >
              {isVerified ? "확인" : "인증하기"}
            </button>
          </div>
        </div>
        <div className='middlemodalbox'>
          {/* 결과 페이지로 이동하는 Link 컴포넌트 */}
          {/* <Link to='/CustomMain/Receiveresult'> */}
            <button
              className="button bigbutton"
              onClick={handleConfirmation}
            >
              확인하기
            </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  )
}

export default Resultconfirm;
