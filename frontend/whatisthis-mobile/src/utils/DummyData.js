export const dummyBuildingData = [
  {
    id: 1,
    addr: "감자시 고구마구 호박로 1번길 100 야채빌",
    todo: 10,
    inProgress: 3,
    houses: [
      {
        id: 1,
        dong: 101,
        ho: 101,
        status: "done",
        isConnected: false,
      },
      {
        id: 2,
        dong: 101,
        ho: 102,
        status: "todo",
        isConnected: true,
      },
      {
        id: 3,

        dong: 101,
        ho: 103,
        status: "done",
        isConnected: false,
      },
      {
        id: 4,

        dong: 101,
        ho: 104,
        status: "todo",
        isConnected: true,
      },
      {
        id: 5,
        dong: 101,
        ho: 105,
        status: "done",
        isConnected: false,
      },
    ],
  },
  {
    id: 2,
    addr: "토란시 감치구 돼지로 2번길 32 채소빌",
    todo: 12,
    inProgress: 3,
    houses: [
      {
        id: 6,
        dong: 201,
        ho: 101,
        status: "todo",
        isConnected: false,
      },
      {
        id: 7,
        dong: 201,
        ho: 102,
        status: "done",
        isConnected: false,
      },
      {
        id: 8,
        dong: 201,
        ho: 103,
        status: "done",
        isConnected: false,
      },
      {
        id: 9,
        dong: 201,
        ho: 104,
        status: "todo",
        isConnected: false,
      },
      {
        id: 10,
        dong: 201,
        ho: 105,
        status: "done",
        isConnected: false,
      },
    ],
  },
  {
    id: 3,
    addr: "병아리시 알알구 아리로 3번길 99 치킨빌",
    todo: 40,
    inProgress: 1,
    houses: [
      {
        id: 11,
        dong: 301,
        ho: 101,
        status: "todo",
        isConnected: false,
      },
      {
        id: 12,
        dong: 301,
        ho: 102,
        status: "todo",
        isConnected: false,
      },
      {
        id: 13,
        dong: 301,
        ho: 103,
        status: "done",
        isConnected: false,
      },
      {
        id: 14,
        dong: 301,
        ho: 104,
        status: "done",
        isConnected: false,
      },
      {
        id: 15,
        dong: 301,
        ho: 105,
        status: "todo",
        isConnected: false,
      },
    ],
  },
  {
    id: 4,
    addr: "닭시 계구 췩힌로 4번길 101",
    todo: 5,
    inProgress: 0,
    houses: [
      {
        id: 16,
        dong: 401,
        ho: 101,
        status: "done",
        isConnected: false,
      },
      {
        id: 17,
        dong: 401,
        ho: 102,
        status: "done",
        isConnected: false,
      },
      { id: 18, dong: 401, ho: 103, status: "done", isConnected: false },
      { id: 19, dong: 401, ho: 104, status: "done", isConnected: false },
      { id: 20, dong: 401, ho: 105, status: "done", isConnected: false },
    ],
  },
];

export const dummyHouseData = [
  {
    id: 1,
    dong: 101,
    ho: 101,
    status: "done",
    isConnected: false,
  },
  {
    id: 2,
    dong: 101,
    ho: 102,
    status: "todo",
    isConnected: true,
  },
  {
    id: 3,

    dong: 101,
    ho: 103,
    status: "done",
    isConnected: false,
  },
  {
    id: 4,

    dong: 101,
    ho: 104,
    status: "todo",
    isConnected: true,
  },
  {
    id: 5,
    dong: 101,
    ho: 105,
    status: "done",
    isConnected: false,
  },
  {
    id: 6,
    dong: 201,
    ho: 101,
    status: "todo",
    isConnected: false,
  },
  {
    id: 7,
    dong: 201,
    ho: 102,
    status: "done",
    isConnected: false,
  },
  {
    id: 8,
    dong: 201,
    ho: 103,
    status: "done",
    isConnected: false,
  },
  {
    id: 9,
    dong: 201,
    ho: 104,
    status: "todo",
    isConnected: false,
  },
  {
    id: 10,
    dong: 201,
    ho: 105,
    status: "done",
    isConnected: false,
  },

  {
    id: 11,
    dong: 301,
    ho: 101,
    status: "todo",
    isConnected: false,
  },
  {
    id: 12,
    dong: 301,
    ho: 102,
    status: "todo",
    isConnected: false,
  },
  {
    id: 13,
    dong: 301,
    ho: 103,
    status: "done",
    isConnected: false,
  },
  {
    id: 14,
    dong: 301,
    ho: 104,
    status: "done",
    isConnected: false,
  },
  {
    id: 15,
    dong: 301,
    ho: 105,
    status: "todo",
    isConnected: false,
  },
  {
    id: 16,
    dong: 401,
    ho: 101,
    status: "done",
    isConnected: false,
  },
  {
    id: 17,
    dong: 401,
    ho: 102,
    status: "done",
    isConnected: false,
  },
  { id: 18, dong: 401, ho: 103, status: "done", isConnected: false },
  { id: 19, dong: 401, ho: 104, status: "done", isConnected: false },
  { id: 20, dong: 401, ho: 105, status: "done", isConnected: false },
];

export const dummySections = [
  {
    sectionName: "구역 1",
    sectionId: 1,
    isFinish: false,
    todoList: [
      {
        id: 1,
        todoName: "구역 1 할일1",
        isChecked: false,
        description: "구역1-1",
        imageList: ["/assets/image_none.png"],
      },
      {
        id: 2,
        todoName: "구역 1 할일2",
        isChecked: true,
        description: "구역1-2",
        imageList: ["/assets/image_none.png", "/assets/image_none.png"],
      },
      {
        id: 3,
        todoName: "구역 1 할일3",
        isChecked: false,
        description: "구역1-3",
        imageList: ["/assets/image_none.png", "/assets/image_none.png", "/assets/image_none.png"],
      },
    ],
  },
  {
    sectionName: "구역 2",
    sectionId: 2,
    isFinish: false,
    todoList: [
      {
        id: 1,
        todoName: "구역 2 할일1",
        isChecked: false,
        description: "구역2-1",
        imageList: ["/assets/image_none.png", "/assets/image_none.png"],
      },
      {
        id: 2,
        todoName: "구역 2 할일2",
        isChecked: true,
        description: "구역2-2",
        imageList: ["/assets/image_none.png"],
      },
      {
        id: 3,
        todoName: "구역 2 할일3",
        isChecked: false,
        description: "구역2-3",
        imageList: ["/assets/image_none.png", "/assets/image_none.png", "/assets/image_none.png"],
      },
    ],
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

export const dummyTodoList = ["할일 1", "할일 2", "할일 3", "할일 4", "할일 5"];
export const dummySectionList = [
  {
    id: 1,
    sectionName: "더미구역 1",
  },
  {
    id: 2,
    sectionName: "더미구역 2",
  },
  {
    id: 3,
    sectionName: "더미구역 3",
  },
  {
    id: 4,
    sectionName: "더미구역 4",
  },
  {
    id: 5,
    sectionName: "더미구역 5",
  },
];
