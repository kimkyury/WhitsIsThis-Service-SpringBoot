package com.mo.whatisthis.security.configs;

import com.mo.whatisthis.jwt.filters.JwtAuthenticationFilter;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.filter.CorsFilter;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity // Security 활성화, Spring FilterChain에 등록됨
public class SecurityConfig {

    private final CorsFilter corsFilter;
    private final JwtTokenProvider jwtTokenProvider;

    private final String[] AUTH_WHITELIST = {"/swagger-ui.html", "/webjars/**",
        "/file/**", "/swagger-resources/**", "/swagger/**", "/swagger-ui/**"};
    private final String[] AUTH_BLACK_LIST = {"/api/v1/private/**"};

    private AuthenticationManager authenticationManager;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf()
            .disable();
        http.authorizeRequests()
            .requestMatchers(CorsUtils::isPreFlightRequest)
            .permitAll()

            .and()
            .addFilter(corsFilter)
            .httpBasic()
            .disable()
            .formLogin()
            .disable()

            .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                UsernamePasswordAuthenticationFilter.class)
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

//            .and()
//            .exceptionHandling()
//            .authenticationEntryPoint(jwtAuthenticationEntryPoint)
//            .accessDeniedHandler(jwtAccessDeniedHandler)

            .and()
            .authorizeRequests()
            .antMatchers(AUTH_BLACK_LIST)
            .access("hasRole('ROLE_EMPLOYEE')")

            .anyRequest()
            .permitAll();


        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
                           .antMatchers(AUTH_WHITELIST);
    }

    @Bean
    public AuthenticationManager authenticationManager(
        AuthenticationConfiguration authenticationConfiguration)
        throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}