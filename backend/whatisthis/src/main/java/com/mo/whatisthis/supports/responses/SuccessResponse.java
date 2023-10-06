package com.mo.whatisthis.supports.responses;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.mo.whatisthis.supports.codes.SuccessCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;



@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SuccessResponse<T> {

    private Integer status;
    private String message;
    private T data;

    public static <T> SuccessResponse<T> ofStatus(final SuccessCode code) {
        return new SuccessResponse<>(code.getStatus(), code.getMessage(), null);
    }

    public static <T> SuccessResponse<T> ofStatusAndMessage(final SuccessCode code,
        String message) {
        return new SuccessResponse<>(code.getStatus(), message, null);
    }

    public static <T> SuccessResponse<T> ofStatusAndData(final SuccessCode code, T data) {
        return new SuccessResponse<>(code.getStatus(), null, data);
    }

    public static <T> SuccessResponse<T> ofStatusAndMessageAndData(final SuccessCode code,
        String message, T data) {
        return new SuccessResponse<>(code.getStatus(), message, data);
    }

}
