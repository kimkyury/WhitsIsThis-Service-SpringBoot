import TodoSectionItem from "./TodoSectionItem";
import TodoListItem from "./TodoListItem";
import { useNavigate } from "react-router-dom";
import AuthHttp from "../utils/AuthHttp";

const SectionDetail = ({ targetSection, isSectionDetail, handleSectionOpen }) => {
  const navigate = useNavigate();

  const closeSectionDetail = async (roomOrder) => {
    console.log(targetSection);
    const updateCycle = targetSection.todolist.map(async (todo) => {
      try {
        const response = await AuthHttp({
          method: "patch",
          url: `/private/todolists/${todo.id}/status`,
          data: {
            isChecked: todo.isChecked,
            significant: todo.significant,
          },
        });
      } catch (e) {
        console.error(e);
      }
    });
    await Promise.all(updateCycle);

    handleSectionOpen(roomOrder);
  };

  const handleCheckboxChange = (id, value) => {
    targetSection.todolist.find((it) => parseInt(it.id) === parseInt(id)).isChecked = value;
  };

  const handleDescriptionChange = (id, value) => {
    targetSection.todolist.find((it) => parseInt(it.id) === parseInt(id)).significant = value;
  };

  const openCamera = (todoListItemId, todoListContent) => {
    console.log(todoListItemId);
    const targetTodoItem = targetSection.todolist.find(
      (it) => parseInt(it.id) === parseInt(todoListItemId)
    );
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
        <TodoSectionItem
          sectionName={targetSection.roomName}
          onClick={() => closeSectionDetail(targetSection)}
          type={"add"}
          isSave={true}
        />
        {targetSection.todolist &&
          targetSection.todolist.map((it) => {
            return (
              <TodoListItem
                key={it.id}
                todoListId={it.id}
                handleCheckboxChange={handleCheckboxChange}
                handleDescriptionChange={handleDescriptionChange}
                todoListItem={it}
                openCamera={openCamera}
              />
            );
          })}
      </div>
    );
  }
};

export default SectionDetail;
