package com.mo.whatisthis.apis.request.requests;

import java.time.LocalDate;
import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SetRequestManagerRequest {

    @NotNull
    private LocalDate inspectionDate;
}
