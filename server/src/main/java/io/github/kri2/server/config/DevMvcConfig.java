package io.github.kri2.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * WebMvcConfigurer Defines callback methods to customize the Java-based
 * configuration for Spring MVC enabled via @EnableWebMvc.
 * @EnableWebMvc-annotated configuration classes may implement this interface
 * to be called back and given a chance to customize the default configuration.
 *
 */
@EnableWebMvc
@Configuration
@Profile("dev")
public class DevMvcConfig implements WebMvcConfigurer
{
    /**
     * Enables cross origin requests for localhost-served Angular app
     * @param registry
     */
    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200","http://localhost:8080")// with this hello-world check won't work
                .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE");
    }
}
