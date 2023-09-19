package com.mo.whatisthis.apis.request.controllers;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/private/request")
@Tag(name = "3. InspectionRequest")
@RequiredArgsConstructor
public class RequestPrivateController {


}
