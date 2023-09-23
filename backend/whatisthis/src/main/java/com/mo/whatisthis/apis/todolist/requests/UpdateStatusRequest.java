package com.mo.whatisthis.apis.todolist.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateStatusRequest {

    private Boolean isChecked;
    private String significant;
}
