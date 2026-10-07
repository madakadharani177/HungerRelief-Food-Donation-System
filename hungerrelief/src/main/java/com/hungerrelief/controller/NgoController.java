package com.hungerrelief.controller;

import com.hungerrelief.entity.Donation;
import com.hungerrelief.entity.PickupRequest;
import com.hungerrelief.service.NgoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ngos")
@CrossOrigin(origins = "http://localhost:5173")
public class NgoController {

    private final NgoService ngoService;

    public NgoController(NgoService ngoService) {
        this.ngoService = ngoService;
    }

    @GetMapping("/donations")
    public ResponseEntity<List<Donation>> getAvailableDonations() {

        return ResponseEntity.ok(
                ngoService.getAvailableDonations());
    }

    @PostMapping("/accept/{donationId}")
    public ResponseEntity<PickupRequest> acceptDonation(
            @PathVariable Long donationId,
            @RequestParam Long ngoId) {

        return ResponseEntity.ok(
                ngoService.acceptDonation(
                        donationId,
                        ngoId));
    }

    @GetMapping("/{ngoId}/requests")
    public ResponseEntity<List<PickupRequest>> getMyRequests(
            @PathVariable Long ngoId) {

        return ResponseEntity.ok(
                ngoService.getMyRequests(ngoId));
    }
}