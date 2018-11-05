package io.github.kri2.server;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabasePrimer
{
    @Bean
    CommandLineRunner initDatabase(CarRepository carRepository){
        return args->{
            carRepository.save(new Car("Ferrari","Testarossa"));
            carRepository.save(new Car("Buick","Riviera"));
            carRepository.save(new Car("Lotus","Esprit"));
        };
    }
}

