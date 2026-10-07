package com.hungerrelief.controller;

import com.hungerrelief.dto.DonationRequest;
import com.hungerrelief.entity.Donation;
import com.hungerrelief.service.DonationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "http://localhost:5173")
public class DonationController {

    private final DonationService donationService;

    public DonationController(DonationService donationService) {
        this.donationService = donationService;
    }
    @PostMapping
    public ResponseEntity<Donation> create(
            @Valid @RequestBody DonationRequest request) {

        return ResponseEntity.ok(
                donationService.createDonation(request));
    }

    @GetMapping
    public ResponseEntity<List<Donation>> getAll() {
        return ResponseEntity.ok(
                donationService.getAllDonations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Donation> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                donationService.getDonation(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Donation> update(
            @PathVariable Long id,
            @Valid @RequestBody DonationRequest request) {

        return ResponseEntity.ok(
                donationService.updateDonation(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable Long id) {

        donationService.deleteDonation(id);

        return ResponseEntity.ok(
                "Donation deleted successfully");
    }
}