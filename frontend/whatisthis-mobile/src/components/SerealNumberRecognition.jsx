const SerealNumberRecognition = ({ isOpen }) => {
  console.log(isOpen);
  const modalStatus = isOpen ? "slide_up" : "slide_out";
  console.log(modalStatus);
  return (
    <div className={`SerealNumberRecognition options ${modalStatus}`}>
      <div className="option_header">
        <img src="/assets/stick_small.png" alt="" />
      </div>
      <h2>SerealNumberRecognition component</h2>
    </div>
  );
};

SerealNumberRecognition.defaultProps = {
  isOpen: false,
};

export default SerealNumberRecognition;
