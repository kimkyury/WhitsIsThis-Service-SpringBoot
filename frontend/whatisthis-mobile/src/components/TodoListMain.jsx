import { useState } from "react";
import TodoSectionItem from "./TodoSectionItem";

const dummySections = [
  {
    sectionName: "구역 1",
    sectionId: 1,
    isFinish: false,
  },
  {
    sectionName: "구역 2",
    sectionId: 2,
    isFinish: false,
  },
  {
    sectionName: "구역 3",
    sectionId: 3,
    isFinish: false,
  },
  {
    sectionName: "구역 4",
    sectionId: 4,
    isFinish: true,
  },
  {
    sectionName: "구역 5",
    sectionId: 5,
    isFinish: true,
  },
];

// 닫기는게 왼쪽 열리는게 오른쪽 디폴트는 고정
const TodoListMain = ({ isListMain, sectionList, handleAddClick, handleSectionOpen }) => {
  const [isFinish, setIsFinish] = useState(false);

  // return (

  return (
    <div
      className={`TodoListMain section_list ${isListMain ? "slide_in_left" : "slide_out_left"} `}
    >
      <div className="user_request">
        <h3>사용자 요청사항</h3>
        <p>
          사용자 요청사항 사용 자요 청사항 사 용자요 청사항 사용자 요청사항 사용 자요 청사항 사
          용자요 청
        </p>
      </div>
      {/* section list map 적용해서 출력 */}
      {dummySections.map((it, idx) => {
        return (
          <TodoSectionItem
            sectionName={it.sectionName}
            // handleSectionOpen 전달 값 변경해야함
            onClick={() => handleSectionOpen(it.sectionId)}
            isFinish={it.isFinish}
          />
        );
      })}

      <div className="TodoSectionItem" onClick={handleAddClick}>
        <img
          className="add_section_btn"
          src={process.env.PUBLIC_URL + `/assets/plus_circle_grey.png`}
          alt="add"
        />
      </div>
    </div>
  );
};

TodoListMain.defaultProps = {
  sectionList: [],
};

export default TodoListMain;
