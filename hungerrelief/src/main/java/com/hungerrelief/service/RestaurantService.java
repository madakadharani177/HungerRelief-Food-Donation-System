package com.hungerrelief.service;

import com.hungerrelief.dto.DonationRequest;
import com.hungerrelief.entity.Donation;
import com.hungerrelief.entity.Restaurant;
import com.hungerrelief.exception.ResourceNotFoundException;
import com.hungerrelief.repository.DonationRepository;
import com.hungerrelief.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final DonationRepository donationRepository;

    public RestaurantService(
            RestaurantRepository restaurantRepository,
            DonationRepository donationRepository) {

        this.restaurantRepository = restaurantRepository;
        this.donationRepository = donationRepository;
    }

    public Donation createDonation(DonationRequest request) {

        Restaurant restaurant = restaurantRepository
                .findById(request.getRestaurantId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Restaurant not found"));

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

    public List<Donation> getRestaurantDonations(Long restaurantId) {

        if (!restaurantRepository.existsById(restaurantId)) {
            throw new ResourceNotFoundException("Restaurant not found");
        }

        return donationRepository
                .findByRestaurantIdOrderByCreatedAtDesc(restaurantId);
    }
}