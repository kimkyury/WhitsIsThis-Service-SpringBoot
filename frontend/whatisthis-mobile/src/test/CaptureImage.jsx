import React, { useRef, useState } from "react";

import MyCamera from "./MyCamera";
import MyButton from "../components/MyButton";

const CaptureImage = () => {
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState([]);

  // camera 컴포넌트에서 설정해줘야할듯
  //   const playCamera = () => {
  //     if (cameraRef.current) {
  //       cameraRef.current.play();
  //     }
  //   };

  //   const pauseCamera = () => {
  //     if (cameraRef.current && canvasRef.current) {
  //       const cameraElement = cameraRef.current;
  //       const canvasElement = canvasRef.current;
  //       const context = canvasElement.getContext("2d");

  //       const stream = cameraElement.srcObject;
  //       if (stream) {
  //         const tracks = stream.getTracks();
  //         tracks.forEach((track) => track.stop());
  //       }

  //       context.fillStyle = "#000";
  //       context.fillRect(0, 0, canvasElement.width, canvasElement.height);
  //     }
  //   };

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
    }
  };

  return (
    <div className="CaptureImage container">
      {/* <MyButton text={"on"} onClick={playCamera} /> */}
      {/* <MyButton text={"pause"} onClick={pauseCamera} /> */}
      <MyCamera cameraRef={cameraRef} />
      <div style={{ marginBottom: "1rem" }}>
        <MyButton text={"capture"} onClick={captureScreen} />
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} width="320" height="240" />
      <div
        className="image_container"
        style={{
          width: "19.5rem",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
          overflow: "scroll",
        }}
      >
        {capturedImage &&
          capturedImage.map((it, idx) => {
            return <img key={idx} src={it} alt="Captured" />;
          })}
      </div>
    </div>
  );
};

export default CaptureImage;
