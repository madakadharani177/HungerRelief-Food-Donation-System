package com.hungerrelief.controller;

import com.hungerrelief.entity.Donation;
import com.hungerrelief.entity.PickupRequest;
import com.hungerrelief.service.VolunteerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/volunteers")
@CrossOrigin(origins = "http://localhost:5173")
public class VolunteerController {

    private final VolunteerService volunteerService;

    public VolunteerController(VolunteerService volunteerService) {
        this.volunteerService = volunteerService;
    }

    @GetMapping("/donations")
    public ResponseEntity<List<Donation>> getAvailableDonations() {

        return ResponseEntity.ok(
                volunteerService.getAvailableDonations());
    }

    @PostMapping("/pickup/{donationId}")
    public ResponseEntity<PickupRequest> acceptPickup(
            @PathVariable Long donationId,
            @RequestParam Long volunteerId) {

        return ResponseEntity.ok(
                volunteerService.acceptPickup(
                        donationId,
                        volunteerId));
    }

    @GetMapping("/{volunteerId}/pickups")
    public ResponseEntity<List<PickupRequest>> getMyPickups(
            @PathVariable Long volunteerId) {

        return ResponseEntity.ok(
                volunteerService.getMyPickups(volunteerId));
    }
}