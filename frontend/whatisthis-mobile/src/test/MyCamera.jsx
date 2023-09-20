import React, { useEffect, useRef, useState } from "react";

function MyCamera({ cameraRef }) {
  const [error, setError] = useState(null);

  useEffect(() => {
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

  return (
    <div className="MyCamera">
      {error ? (
        <p>카메라 권한이 거부되었습니다. 권한 설정을 확인해 주세요.</p>
      ) : (
        <video ref={cameraRef} autoPlay playsInline />
      )}
    </div>
  );
}

export default MyCamera;
