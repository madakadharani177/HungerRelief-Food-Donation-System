package com.hungerrelief.config;

import com.hungerrelief.entity.Role;
import com.hungerrelief.entity.User;
import com.hungerrelief.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner createAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            if (!userRepository.existsByEmail("admin@hungerrelief.com")) {

                User admin = new User();

                admin.setName("HungerRelief Admin");
                admin.setEmail("admin@hungerrelief.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setPhone("9999999999");
                admin.setRole(Role.ADMIN);

                userRepository.save(admin);
            }
        };
    }
}