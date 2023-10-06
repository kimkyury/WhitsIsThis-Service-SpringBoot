package com.mo.whatisthis.apis.socket.handlers.common;

public class CommonCode {

    public enum SessionKey {
        HISTORY_ID, ROLE, EMPLOYEE_NO, SERIAL_NUMBER
    }

    public enum SendType {
        AUTH, REGISTER, COMMAND, COORDINATE, DRAWING, DAMAGED, STATUS, IOT_DEVICE, DRAWING_ROUTE, COMPLETION_RATE, SYSTEM_MESSAGE;
    }

    public enum DataType {
        accessToken, image, x, y, category, state, command, historyId, serialNumber, isWorked, rate, message;
    }

    public enum CommandCode {
        START, END
    }

    public enum StateType {
        WAIT_CONNECT,          // 초기에 기기가 켜진 후, 소켓 통신 연결 대기 상태
        WAIT_WORK,                 // 소켓 통신 연결 후, 직원의 명령 대기 상태
        WAIT_MAPPING,           // 명령을 받은 후, 터틀봇에서 지형 파악을 하기위해 움직이기 전 상태
        MAPPING,                      // 지형 파악중
        CALCULATE_PATH,       // 지형 파악 후, 경로 생성 중
        WAIT_FINDING,             // 경로 생성 완료 후, 실행 전 대기 상태
        FINDING,                        // 생성된 경로로 돌아다니는 중
        FINISH,                            // 경로를 완주한 후 대기상태
        ERROR,                            // 혹시 통신중 에러가 난다면 바꿔두긴 하지만 아마 기계가 꺼지도록 할 것 같습니다.
        WORK_STOP               // 직원이 언제든 END 명령을 주었을 때, 소켓통신이 끊깁니다. }
    }

    public enum MessageError {
        NOT_INCLUDE_ACCESSTOKEN,
        NOT_INCLUDE_IMAGE,
        NOT_INCLUDE_X,
        NOT_INCLUDE_Y,
        NOT_INCLUDE_CATEGORY, // hasType
        NOT_INCLUDE_STATE, // hasType
        NOT_INCLUDE_COMMAND, // hasType
        NOT_INCLUDE_HISTORYID,
        NOT_INCLUDE_SERIALNUMBER,
        NOT_INCLUDE_RATE,

        IS_NOT_REGISTER_DEVICE,
        INVALID_STATE_TYPE,
        INVALID_COMMAND_TYPE,
        INVALID_CATEGORY_TYPE,

        NOT_EXIST_DEVICE,
        NOT_CONNECT_DEVICE,
        NOT_EXIST_EMPLOYEE, //TODO: Turtle봇이 존재하지 않는 Employee에게 전송시.
        NOT_EXIST_HISTORY,

        DB_ACCESS_ERROR;
    }
}
