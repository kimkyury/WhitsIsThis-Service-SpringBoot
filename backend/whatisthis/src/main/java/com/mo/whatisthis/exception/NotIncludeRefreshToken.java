package com.mo.whatisthis.exception;

import com.mo.whatisthis.supports.codes.ErrorCode;
import java.io.Serializable;

public class NotIncludeRefreshToken extends CustomException implements Serializable {

    public NotIncludeRefreshToken(ErrorCode errorCode) {
        super(errorCode);
    }
}
