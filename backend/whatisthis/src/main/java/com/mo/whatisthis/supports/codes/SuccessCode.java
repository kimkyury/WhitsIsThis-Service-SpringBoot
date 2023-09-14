package com.mo.whatisthis.supports.codes;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SuccessCode {
//    REQUEST_SUCCESS(200, "REQUEST SUCCESS"),
//    SELECT_SUCCESS(200, "SELECT SUCCESS"),
//    DELETE_SUCCESS(200, "DELETE SUCCESS"),
//    INSERT_SUCCESS(201, "INSERT SUCCESS"),
//    UPDATE_SUCCESS(204, "UPDATE SUCCESS");

    OK(200, "OK"),
    CREATED(201, "Resource Created Successfully"),
    ACCEPTED(202, "Request Accepted for Processing"),
    NO_CONTENT(204, "No Content"),
    RESET_CONTENT(205, "Reset Content"), // 요청은 성공적인데 클라이언트가 문서 보기를 초기화해야할 때
    PARTIAL_CONTENT(206, "Partial Content Provided"); // Client가 Range Header를 써서 일부 리소스만 요청시

    private final Integer status;
    private final String message;
}
