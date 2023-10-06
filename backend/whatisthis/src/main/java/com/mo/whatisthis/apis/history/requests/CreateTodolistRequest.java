package com.mo.whatisthis.apis.history.requests;

import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateTodolistRequest {

    @NotNull
    private Integer roomId;
}
