import { useNavigate, useLocation } from "react-router-dom";
import Notification from "../components/Notification";
import { useEffect, useRef, useState } from "react";
import AuthHttp from "../utils/AuthHttp";

const Camera = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const receivedInfo = location.state;
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);

  const [capturedImage, setCapturedImage] = useState([]);
  const [existingImageId, setExistingImageId] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCapturedImage(receivedInfo.images);
    setExistingImageId(receivedInfo.images && receivedInfo.images.map((it) => it.id));
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 296 },
            height: { ideal: 412 },
          },
        });

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
    if (capturedImage && capturedImage.length === 3) {
      alert("이미지는 최대 3개만 촬영가능");
      return;
    }

    if (cameraRef.current && canvasRef.current) {
      const cameraElement = cameraRef.current;
      const canvasElement = canvasRef.current;
      const context = canvasElement.getContext("2d");

      context.drawImage(cameraElement, 0, 0, canvasElement.width, canvasElement.height);

      const capturedImageUrl = canvasElement.toDataURL("image/jpeg");
      if (capturedImage) {
        setCapturedImage((prevImage) => [{ imageUrl: capturedImageUrl }, ...prevImage]);
      } else {
        setCapturedImage([{ imageUrl: capturedImageUrl }]);
      }
    } else {
      console.log(cameraRef.current);
      console.log(canvasRef.current);
    }
  };

  const convertImageUrlTpFormData = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "captured_image.jpg", { type: "image/jpeg" });

      return file;
    } catch (e) {
      console.error(e);
    }
  };

  const removeImage = (indexToRemove) => {
    setCapturedImage((prevImages) => {
      return prevImages.filter((_, idx) => idx !== indexToRemove);
    });
  };

  const saveAndBack = async () => {
    if (capturedImage.length > 0) {
      const uploadCycle = capturedImage
        .filter((image) => image.id === undefined)
        .map(async (it) => {
          try {
            const image = await convertImageUrlTpFormData(it.imageUrl);

            const response = await AuthHttp({
              headers: { "Content-Type": "multipart/form-data" },
              method: "post",
              url: `/private/todolists/${receivedInfo.todoListId}/images`,
              data: {
                image: image,
              },
            });
            console.log("uploaded");
          } catch (e) {
            console.error(e);
          }
        });
      uploadCycle && (await Promise.all(uploadCycle));
    }

    const deleteCycle =
      existingImageId &&
      existingImageId.map(async (id) => {
        const checkIdIsExist = capturedImage.find((image) => image.id === id);
        if (!checkIdIsExist) {
          try {
            const response = await AuthHttp({
              method: "delete",
              url: `/private/todolists/images/${id}`,
            });
          } catch (e) {
            console.error(e);
          }
        }
      });

    deleteCycle && (await Promise.all(deleteCycle));

    navigate(-1);
  };

  return (
    <div className="Camera container">
      <div className="camera_container">
        <img src={process.env.PUBLIC_URL + `/assets/camera_frame_big.png`} alt="frame" />
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
          <h2>{receivedInfo.todoListContent}</h2>
        </div>
        <div className="image_container">
          {capturedImage &&
            capturedImage.map((it, idx) => {
              return (
                <img
                  key={idx}
                  src={it.id ? process.env.REACT_APP_S3_BASE_URL + it.imageUrl : it.imageUrl}
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
