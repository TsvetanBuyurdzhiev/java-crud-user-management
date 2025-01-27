package com.example.javaTaskCRUD.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v2/api-docs/**", "/v3/api-docs/**", "/api/users/**", "/error", "/swagger-resources/**", "/configuration/**").permitAll() // Allow Swagger access
                        .anyRequest().authenticated()// Allow all requests (disable authentication)
                );
        return http.build();
    }

}
