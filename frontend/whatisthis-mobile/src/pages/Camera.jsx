import { useNavigate, useLocation } from "react-router-dom";
import Notification from "../components/Notification";
import { useEffect, useRef, useState } from "react";
import AuthHttp from "../utils/AuthHttp";

const Camera = () => {
  const navigate = useNavigate();
  // location이 아니라 axios 로 받아와야할듯
  const location = useLocation();
  const receivedInfo = location.state;
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);
  // useEffect 등으로 이미지 리스트를 받아와야할듯
  const [capturedImage, setCapturedImage] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCapturedImage(receivedInfo.images);

    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        // 카메라 스트림을 비디오 엘리먼트에 연결합니다.
        if (cameraRef.current) {
          cameraRef.current.srcObject = stream;
        }
      } catch (error) {
        setError(error);
        console.error("카메라 권한을 얻을 수 없습니다:", error);
      }
    };

    getCameraPermission();
  }, []);

  const captureScreen = () => {
    if (capturedImage.length === 3) {
      alert("이미지는 최대 3개만 촬영가능");
      return;
    }

    if (cameraRef.current && canvasRef.current) {
      const cameraElement = cameraRef.current;
      const canvasElement = canvasRef.current;
      const context = canvasElement.getContext("2d");

      // 비디오 화면을 캔버스에 그립니다.
      context.drawImage(cameraElement, 0, 0, canvasElement.width, canvasElement.height);

      // 캔버스의 이미지 데이터를 가져와서 이미지 URL로 변환합니다.
      const capturedImageUrl = canvasElement.toDataURL("image/jpeg");
      // 캡처된 이미지를 상태에 저장합니다.
      setCapturedImage((prevImage) => [capturedImageUrl, ...prevImage]);
    } else {
      console.log(cameraRef.current);
      console.log(canvasRef.current);
    }
  };

  const removeImage = (indexToRemove) => {
    setCapturedImage((prevImages) => {
      return prevImages.filter((_, idx) => idx !== indexToRemove);
    });
  };

  const saveAndBack = async () => {
    // 이미지들 저장로직
    // try {
    //   console.log(capturedImage);
    //   const formData = new FormData();
    //   formData.append("image", capturedImage);
    //   // capturedImage.map((it) => formData.append("image", it));
    //   // console.log(formData);
    //   const response = await AuthHttp({
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //     method: "post",
    //     url: `/private/todolists/${receivedInfo.todoListId}/image`,
    //     data: formData,
    //   });
    //   console.log(response);
    //   // navigate(-1);
    // } catch (e) {
    //   console.error(e);
    // }
    navigate(-1);
  };

  return (
    <div className="Camera container">
      <div className="camera_container">
        <img src={process.env.PUBLIC_URL + `/assets/camera_frame_big.png`} alt="frame" />
        {/* 카메라 */}
        {error ? (
          <p>카메라 권한이 거부되었습니다. 권한 설정을 확인해 주세요.</p>
        ) : (
          <>
            <video ref={cameraRef} autoPlay playsInline />
            <canvas ref={canvasRef} style={{ display: "none" }} width="320" height="240" />
          </>
        )}
      </div>

      <div className="result_wrapper">
        <div className="title">
          {/* 투두 리스트 이름 짧게..*/}
          {/* <h2>{receivedInfo.todoListContent}</h2> */}
          <h2>List Name</h2>
        </div>
        <div className="image_container">
          {/* map.. */}
          {capturedImage &&
            capturedImage.map((it, idx) => {
              return (
                <img
                  key={idx}
                  src={process.env.REACT_APP_S3_BASE_URL + it.imageUrl}
                  alt="Captured"
                  onClick={() => removeImage(idx)}
                />
              );
            })}
        </div>
      </div>

      <div className="button_wrapper">
        <Notification text={"저장 후 닫기"} type={"left"} color={"orange"} onClick={saveAndBack} />
        <Notification text={"촬영"} type={"right"} color={"grey"} onClick={captureScreen} />
      </div>
    </div>
  );
};

export default Camera;
