import MyButton from "./MyButton";

const HouseTodoList = ({ isOpen, handleOpenTodoList }) => {
  const modalStatus = isOpen ? "slide_up" : "slide_out";

  return (
    <div className={`HouseTodoList options ${modalStatus}`}>
      <div className="option_header" onClick={handleOpenTodoList}>
        <img src="/assets/stick_small.png" alt="" />
      </div>
      <div className="user_request">
        <h3>사용자 요청사항</h3>
        <p>
          사용자 요청사항 사용 자요 청사항 사 용자요 청사항 사용자 요청사항 사용
          자요 청사항 사 용자요 청
        </p>
      </div>
      <div className="section_list">
        <h3>helo</h3>
      </div>
    </div>
  );
};

HouseTodoList.defaultProps = {
  isOpen: false,
};

export default HouseTodoList;
