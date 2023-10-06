package com.mo.whatisthis.supports.codes;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    BAD_REQUEST(400, "Bad Request"),
    MISSING_BODY(400, "Required request body is missing"),
    INVALID_TYPE_VALUE(400, "Invalid Type Value"),
    MISSING_PARAMETER(400, "Missing Servlet Request Parameter"),
    IO_EXCEPTION(400, "I/O Exception"),
    JSON_PARSE_EXCEPTION(400, "JSON Parse Exception"),
    JACKSON_EXCEPTION(400, "Jackson Core Exception"),
    VALIDATION_ERROR(400, "Validation Exception"),
    MISSING_HEADER(400, "Header data missing"),

    AUTHCODE_INVALID(400, "승인코드가 일치하지 않거나 만료되었습니다. "),
    PHONE_INVALID(400, "핸드폰 번호가 존재하지 않습니다. "),
    SERIALNUMBER_INVALID(400, "기기번호가 유효하지 않습니다. "),

    STATUS_INVALID(400, "변경할 요청의 상태가 올바르지 않습니다."),

    USERNAME_INVALID(400, "일치하는 아이디가 없습니다."),
    PASSWORD_INVALID(400, "잘못된 비밀번호입니다."),


    UNAUTHORIZED(401, "Unauthorized"),
    TOKEN_EXPIRED(401, "Token is expired"),
    TOKEN_INVALID(401, "토큰이 올바르지 않거나 만료되어 거부되었습니다. "),
    NOT_INCLUDE_REFRESH_TOKEN(401, "Header에 RefreshToken이 첨부되지 않았습니다. "),
    NOT_INCLUDE_ACCESS_TOKEN(401, "Cookie에 AccessToken이 첨부되지 않았습니다. "),
    SESSION_INVALID(401, "해당 세션은 접근권한이 없습니다. "),

    FORBIDDEN(403, "Forbidden"),

    NOT_FOUND(404, "Not Found"),
    NULL_POINTER(404, "Null Pointer Exception"),

    INTERNAL_SERVER_ERROR(500, "Internal Server Error");

    private final int status;
    private final String message;
}
