package com.mo.whatisthis.apis.request.requests;

import com.mo.whatisthis.apis.request.entities.RequestEntity.Status;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatusChangeRequest {

    @NotNull
    private Status status;
}
