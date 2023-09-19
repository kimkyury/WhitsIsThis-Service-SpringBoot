package com.mo.whatisthis.springfox.configs;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.Server;
import springfox.documentation.service.Tag;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.service.SecurityReference;

@Configuration
@EnableWebMvc
public class SwaggerConfig {

    private ApiInfo swaggerInfo() {
        return new ApiInfoBuilder().title("MO API")
                                   .description("이게MO지 API Docs")
                                   .build();
    }

    @Bean
    public Docket api() {
        Server local = new Server("local", "http://localhost:8080", "for local usages",
            Collections.emptyList(), Collections.emptyList());
        return new Docket(DocumentationType.OAS_30)
            .tags(new Tag("0. Testing", "연결 테스트용 APIs"),
                new Tag("1. Auth", "사용자 권한 APIs"),
                new Tag("2. Member", "사용자 APIs" ),
                new Tag("3. InspectionRequest", "점검요청 APIs" ))
            .servers(local)
            .consumes(getConsumeContentTypes())
            .produces(getProduceContentTypes())
            .securityContexts(Arrays.asList(securityContext()))
            .securitySchemes(Arrays.asList(apiKey()))
            .apiInfo(swaggerInfo())
            .select()
            .apis(RequestHandlerSelectors.any())
            .paths(PathSelectors.any())
            .build();
    }

    private Set<String> getConsumeContentTypes() {
        Set<String> consumes = new HashSet<>();
        consumes.add("application/json;charset=UTF-8");
        consumes.add("application/x-www-form-urlencoded");
        return consumes;
    }

    private Set<String> getProduceContentTypes() {
        Set<String> produces = new HashSet<>();
        produces.add("application/json;charset=UTF-8");
        return produces;
    }

    private SecurityContext securityContext() { // 추가된 메서드
        return SecurityContext.builder()
                              .securityReferences(defaultAuth())
                              .build();
    }

    private List<SecurityReference> defaultAuth() { // 추가된 메서드
        AuthorizationScope authorizationScope
            = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Arrays.asList(new SecurityReference("Authorization", authorizationScopes));
    }

    private ApiKey apiKey() {
        return new ApiKey("Authorization", "access_token", "header");
    }
}
