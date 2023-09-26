package com.mo.whatisthis.apis.socket.dto;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageDto {

    private MessageType type;
    private Map<String, String> data;

    public enum MessageType {
        AUTH, REGISTER, COMMAND, COORDINATE, DRAWING, DAMAGED, STATUS;
    }
    public enum MessageDataType {
        accessToken, image, x, y, category, state, command, historyId, serialNumber
    }
}
