package com.mo.whatisthis.exception;

import com.mo.whatisthis.supports.codes.ErrorCode;
import java.io.Serializable;

public class AccessTokenExpirationException extends CustomException implements Serializable {

    public AccessTokenExpirationException(ErrorCode errorCode) {
        super(errorCode);
    }
}
