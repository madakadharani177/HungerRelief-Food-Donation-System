package com.hungerrelief.controller;

import com.hungerrelief.dto.PickupStatusRequest;
import com.hungerrelief.entity.PickupRequest;
import com.hungerrelief.service.PickupService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/volunteers/pickup")
@CrossOrigin(origins = "http://localhost:5173")
public class PickupController {

    private final PickupService pickupService;

    public PickupController(PickupService pickupService) {
        this.pickupService = pickupService;
    }

    @PutMapping("/{pickupId}/status")
    public ResponseEntity<PickupRequest> updateStatus(
            @PathVariable Long pickupId,
            @Valid @RequestBody PickupStatusRequest request) {

        return ResponseEntity.ok(
                pickupService.updateStatus(
                        pickupId,
                        request));
    }
}