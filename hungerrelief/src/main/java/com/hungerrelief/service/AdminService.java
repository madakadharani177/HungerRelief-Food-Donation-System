package com.hungerrelief.service;

import com.hungerrelief.entity.DonationStatus;
import com.hungerrelief.entity.User;
import com.hungerrelief.repository.*;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final VolunteerRepository volunteerRepository;
    private final NgoRepository ngoRepository;
    private final DonationRepository donationRepository;

    public AdminService(
            UserRepository userRepository,
            RestaurantRepository restaurantRepository,
            VolunteerRepository volunteerRepository,
            NgoRepository ngoRepository,
            DonationRepository donationRepository) {

        this.userRepository = userRepository;
        this.restaurantRepository = restaurantRepository;
        this.volunteerRepository = volunteerRepository;
        this.ngoRepository = ngoRepository;
        this.donationRepository = donationRepository;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public List<com.hungerrelief.entity.Donation> getDonations() {
        return donationRepository.findAll();
    }

    public Map<String, Long> getDashboard() {

        Map<String, Long> dashboard = new HashMap<>();

        dashboard.put("totalUsers", userRepository.count());
        dashboard.put("restaurants", restaurantRepository.count());
        dashboard.put("volunteers", volunteerRepository.count());
        dashboard.put("ngos", ngoRepository.count());
        dashboard.put("donations", donationRepository.count());

        dashboard.put(
                "availableDonations",
                donationRepository.countByStatus(
                        DonationStatus.AVAILABLE));

        dashboard.put(
                "acceptedDonations",
                donationRepository.countByStatus(
                        DonationStatus.ACCEPTED));

        dashboard.put(
                "deliveredDonations",
                donationRepository.countByStatus(
                        DonationStatus.DELIVERED));

        return dashboard;
    }
}