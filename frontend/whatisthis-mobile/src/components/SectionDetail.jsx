import TodoSectionItem from "./TodoSectionItem";
import TodoListItem from "./TodoListItem";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import AuthHttp from "../utils/AuthHttp";

// 할일이 객체로 이름, 내용, 선택됨, 이미지 를 갖고 있어야 함

const SectionDetail = ({ targetSection, isSectionDetail, handleSectionOpen }) => {
  const navigate = useNavigate();
  const { houseId } = useParams();
  // 렌더링 여러번 되는 문제 개선 필요

  // useEffect(() => {
  //   const getTodoList = async () => {
  //     try {
  //       const response = await AuthHttp({
  //         method: "patch",
  //         url: `/private/histories/${houseId}/todolists`,
  //         data: {
  //           roomId: targetSection.id,
  //         },
  //       });
  //       console.log(response);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  // }, []);
  const openCamera = (todoListItemId, todoListContent) => {
    console.log(todoListItemId);
    const targetTodoItem = targetSection.todolist.find(
      (it) => parseInt(it.id) === parseInt(todoListItemId)
    );
    // console.log(buildingId, houseId);
    navigate(`/camera`, {
      state: {
        todoListId: todoListItemId,
        todoListContent: todoListContent,
        images: targetTodoItem.images,
      },
    });
  };

  if (!targetSection) {
    return <div className="SectionDetail">로딩중입니다...</div>;
  } else {
    return (
      <div
        className={`SectionDetail section_list ${
          isSectionDetail ? "slide_in_right" : "slide_out_right"
        }`}
      >
        {/* section list map 적용해서 출력 */}
        {/* handleSectionClick은 편의상 임시로 넣은 것 뒤로가기 아이콘을 추가해야할 듯 */}
        <TodoSectionItem
          sectionName={targetSection.roomName}
          onClick={() => handleSectionOpen(targetSection.roomOrder)}
        />
        {targetSection.todolist &&
          targetSection.todolist.map((it) => {
            return <TodoListItem key={it.id} todoListItem={it} openCamera={openCamera} />;
          })}
      </div>
    );
  }
};

export default SectionDetail;
