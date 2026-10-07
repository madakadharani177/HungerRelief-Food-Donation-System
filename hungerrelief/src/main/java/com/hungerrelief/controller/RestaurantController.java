package com.hungerrelief.controller;

import com.hungerrelief.dto.DonationRequest;
import com.hungerrelief.entity.Donation;
import com.hungerrelief.service.RestaurantService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = "http://localhost:5173")
public class RestaurantController {

    private final RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @PostMapping("/donations")
    public ResponseEntity<Donation> createDonation(
            @Valid @RequestBody DonationRequest request) {

        return ResponseEntity.ok(
                restaurantService.createDonation(request));
    }

    @GetMapping("/{id}/donations")
    public ResponseEntity<List<Donation>> getDonations(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                restaurantService.getRestaurantDonations(id));
    }
}