package com.inventorymate.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
  
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow CORS requests for all endpoints and allow access from localhost:3000 (React)
        registry.addMapping("/**")  // Apply to all endpoints in the backend
                .allowedOrigins("http://localhost:3000")  // Allow only localhost:3000 (React)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allow only these HTTP methods
                .allowedHeaders("*")  // Allow all headers in the request
                .allowCredentials(true);  // Allow sending cookies with the request
    }
}
