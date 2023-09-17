import { useEffect, useState } from "react";
import CircularProgressBar from "./CircularProgressBar";

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
      <CircularProgressBar percentage={percentage} />
    </div>
  );
};

export default TestPage;
