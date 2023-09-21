package com.mo.whatisthis.exception;

import com.mo.whatisthis.supports.codes.ErrorCode;
import java.io.Serializable;

public class RefreshTokenExpirationException extends CustomException implements Serializable {

    public RefreshTokenExpirationException(ErrorCode errorCode) {
        super(errorCode);
    }
}
