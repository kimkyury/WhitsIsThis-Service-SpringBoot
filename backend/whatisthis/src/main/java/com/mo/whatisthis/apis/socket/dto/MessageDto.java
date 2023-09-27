package com.mo.whatisthis.apis.socket.dto;

import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SendType;
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

    private SendType type;
    private Map<String, String> data;

}
