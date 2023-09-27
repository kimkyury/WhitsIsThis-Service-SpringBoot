package com.mo.whatisthis.apis.socket.handlers.common;

public class CommonCode {

    public enum SessionKey{
        USERNAME, HISTORY_ID, ROLE, EMPLOYEE_NO
    }


    public enum MessageType {
        AUTH, REGISTER, COMMAND, COORDINATE, DRAWING, DAMAGED, STATUS, IOT_DEVICE, COMPLETION_RATE, RESPONSE;

    }
    public enum MessageDataType {
        accessToken, image, x, y, category, state, command, historyId, serialNumber, isWorked, rate, text;
    }

}
