package com.mo.whatisthis.security.configs;

import java.util.Arrays;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsUtils;

@Configuration
@EnableWebSecurity // Security 활성화, Spring FilterChain에 등록됨
public class SecurityConfig {

    private final String[] AUTH_WHITELIST = {"/swagger-ui.html", "/webjars/**",
        "/file/**", "/swagger-resources/**", "/swagger/**", "/swagger-ui/**"};

    private final String [] AUTH_BLACK_LIST = {"/api/v1/private/**"};

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeRequests()
            .requestMatchers(CorsUtils::isPreFlightRequest)
            .permitAll()

            .and()
            .cors()
            .configurationSource(request -> {
                CorsConfiguration cors = new CorsConfiguration();
                cors.setAllowedOrigins(Arrays.asList("*"));
                cors.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                cors.setAllowedHeaders(Arrays.asList("*"));
                return cors;
            })

            .and()
            .authorizeRequests()
            .antMatchers(AUTH_BLACK_LIST)
            .authenticated()
            .anyRequest()
            .permitAll()

            .and()
            .csrf()
            .disable()
            .httpBasic()
            .disable()
            .formLogin()
            .disable();
//            .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
//                UsernamePasswordAuthenticationFilter.class)
//            .sessionManagement()
//            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

//            .and()
//            .exceptionHandling()
//            .authenticationEntryPoint(jwtAuthenticationEntryPoint)
//            .accessDeniedHandler(jwtAccessDeniedHandler)
        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
                           .antMatchers(AUTH_WHITELIST);
    }
}