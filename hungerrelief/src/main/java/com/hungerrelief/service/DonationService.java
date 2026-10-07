package com.hungerrelief.service;

import com.hungerrelief.dto.DonationRequest;
import com.hungerrelief.entity.Donation;
import com.hungerrelief.entity.DonationStatus;
import com.hungerrelief.entity.Restaurant;
import com.hungerrelief.exception.ResourceNotFoundException;
import com.hungerrelief.repository.DonationRepository;
import com.hungerrelief.repository.RestaurantRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonationService {

    private final DonationRepository donationRepository;
    private final RestaurantRepository restaurantRepository;

    public DonationService(
            DonationRepository donationRepository,
            RestaurantRepository restaurantRepository) {

        this.donationRepository = donationRepository;
        this.restaurantRepository = restaurantRepository;
    }

    // Get all donations
    public List<Donation> getAllDonations() {

        return donationRepository.findAll();
    }

    // Get only available donations
    public List<Donation> getAvailableDonations() {

        return donationRepository
                .findByStatusOrderByCreatedAtDesc(
                        DonationStatus.AVAILABLE);
    }

    // Get donation by ID
    public Donation getDonation(Long id) {

        return donationRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Donation not found"));
    }

    // Create a new donation
    public Donation createDonation(
            DonationRequest request) {

        /*
         * The frontend sends the logged-in USER ID.
         *
         * Therefore we must find the Restaurant
         * using user_id, not restaurant table id.
         */
        Restaurant restaurant = restaurantRepository
                .findByUserId(request.getRestaurantId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Restaurant profile not found for this user"));

        Donation donation = new Donation();

        donation.setRestaurant(restaurant);
        donation.setFoodName(request.getFoodName());
        donation.setDescription(request.getDescription());
        donation.setQuantity(request.getQuantity());
        donation.setFoodType(request.getFoodType());
        donation.setPickupLocation(request.getPickupLocation());
        donation.setPickupDate(request.getPickupDate());
        donation.setPickupTime(request.getPickupTime());
        donation.setExpiryTime(request.getExpiryTime());

        return donationRepository.save(donation);
    }

    // Update donation
    public Donation updateDonation(
            Long id,
            DonationRequest request) {

        Donation donation = getDonation(id);

        Restaurant restaurant = restaurantRepository
                .findByUserId(request.getRestaurantId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Restaurant profile not found for this user"));

        donation.setRestaurant(restaurant);
        donation.setFoodName(request.getFoodName());
        donation.setDescription(request.getDescription());
        donation.setQuantity(request.getQuantity());
        donation.setFoodType(request.getFoodType());
        donation.setPickupLocation(request.getPickupLocation());
        donation.setPickupDate(request.getPickupDate());
        donation.setPickupTime(request.getPickupTime());
        donation.setExpiryTime(request.getExpiryTime());

        return donationRepository.save(donation);
    }

    // Delete donation
    public void deleteDonation(Long id) {

        Donation donation = getDonation(id);

        donationRepository.delete(donation);
    }
}