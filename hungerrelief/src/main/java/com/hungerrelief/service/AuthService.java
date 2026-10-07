package com.hungerrelief.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hungerrelief.dto.AuthResponse;
import com.hungerrelief.dto.LoginRequest;
import com.hungerrelief.dto.RegisterRequest;
import com.hungerrelief.entity.Ngo;
import com.hungerrelief.entity.Restaurant;
import com.hungerrelief.entity.Role;
import com.hungerrelief.entity.User;
import com.hungerrelief.entity.Volunteer;
import com.hungerrelief.repository.NgoRepository;
import com.hungerrelief.repository.RestaurantRepository;
import com.hungerrelief.repository.UserRepository;
import com.hungerrelief.repository.VolunteerRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final VolunteerRepository volunteerRepository;
    private final NgoRepository ngoRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            RestaurantRepository restaurantRepository,
            VolunteerRepository volunteerRepository,
            NgoRepository ngoRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.restaurantRepository = restaurantRepository;
        this.volunteerRepository = volunteerRepository;
        this.ngoRepository = ngoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {

        // Check duplicate email
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Convert role to enum
        Role role;

        try {
            role = Role.valueOf(request.getRole().toUpperCase());
        } catch (Exception e) {
            throw new RuntimeException("Invalid role");
        }

        // Create user
        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRole(role);

        // Save user
        userRepository.save(user);

        // Restaurant
        if (role == Role.RESTAURANT) {

            if (request.getRestaurantName() == null
                    || request.getRestaurantName().isBlank()) {

                throw new RuntimeException("Restaurant name is required");
            }

            Restaurant restaurant = new Restaurant();

            restaurant.setUser(user);
            restaurant.setRestaurantName(request.getRestaurantName());
            restaurant.setAddress(request.getAddress());

            restaurantRepository.save(restaurant);
        }

        // Volunteer
        else if (role == Role.VOLUNTEER) {

            Volunteer volunteer = new Volunteer();

            volunteer.setUser(user);
            volunteer.setAvailability(true);

            volunteerRepository.save(volunteer);
        }

        // NGO
        else if (role == Role.NGO) {

            if (request.getNgoName() == null
                    || request.getNgoName().isBlank()) {

                throw new RuntimeException("NGO name is required");
            }

            Ngo ngo = new Ngo();

            ngo.setUser(user);
            ngo.setNgoName(request.getNgoName());
            ngo.setAddress(request.getAddress());

            ngoRepository.save(ngo);
        }

        return new AuthResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                "Registration successful"
        );
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        // Check password
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid email or password");
        }

        return new AuthResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                "Login successful"
        );
    }
}