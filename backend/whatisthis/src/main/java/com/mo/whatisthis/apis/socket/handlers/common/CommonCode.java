package com.mo.whatisthis.apis.socket.handlers.common;

public class CommonCode {

    public enum SessionKey{
        HISTORY_ID, ROLE, EMPLOYEE_NO, SERIAL_NUMBER
    }

    public enum SendType {
        AUTH, REGISTER, COMMAND, COORDINATE, DRAWING, DAMAGED, STATUS, IOT_DEVICE, COMPLETION_RATE, SEND_RESULT;
    }

    public enum DataType {
        accessToken, image, x, y, category, state, command, historyId, serialNumber, isWorked, rate, text, result;
    }
}
