import { useEffect, useState } from "react";
import CircularProgressBar from "./CircularProgressBar";
import QRCodeScanner from "./QRCodeScanner";
import Test from "./Test";
import Test2 from "./Test2";
import MyCamera from "./MyCamera";
import CaptureImage from "./CaptureImage";
const TestPage = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (percentage < 70) {
        setPercentage((prevPercentage) => prevPercentage + 10);
      }
    });

    return () => clearInterval(timer);
  }, [percentage]);

  return (
    <div className="App">
      {/* <CircularProgressBar percentage={percentage} /> */}
      {/* <Test /> */}
      {/* <Test2 /> */}
      <CaptureImage />
    </div>
  );
};

export default TestPage;
