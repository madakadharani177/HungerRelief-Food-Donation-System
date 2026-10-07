package com.hungerrelief.service;

import com.hungerrelief.dto.PickupStatusRequest;
import com.hungerrelief.entity.*;
import com.hungerrelief.exception.BadRequestException;
import com.hungerrelief.exception.ResourceNotFoundException;
import com.hungerrelief.repository.DonationRepository;
import com.hungerrelief.repository.PickupRequestRepository;
import org.springframework.stereotype.Service;

@Service
public class PickupService {

    private final PickupRequestRepository pickupRequestRepository;
    private final DonationRepository donationRepository;

    public PickupService(
            PickupRequestRepository pickupRequestRepository,
            DonationRepository donationRepository) {

        this.pickupRequestRepository = pickupRequestRepository;
        this.donationRepository = donationRepository;
    }

    public PickupRequest updateStatus(
            Long pickupId,
            PickupStatusRequest request) {

        PickupRequest pickup = pickupRequestRepository
                .findById(pickupId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Pickup request not found"));

        PickupStatus newStatus;

        try {
            newStatus = PickupStatus.valueOf(
                    request.getStatus().toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new BadRequestException(
                    "Invalid pickup status");
        }

        Donation donation = pickup.getDonation();

        if (newStatus == PickupStatus.PICKED_UP) {

            if (donation.getStatus() != DonationStatus.ACCEPTED) {
                throw new BadRequestException(
                        "Donation must be accepted before pickup");
            }

            donation.setStatus(DonationStatus.PICKED_UP);

        } else if (newStatus == PickupStatus.DELIVERED) {

            if (donation.getStatus() != DonationStatus.PICKED_UP) {
                throw new BadRequestException(
                        "Donation must be picked up before delivery");
            }

            donation.setStatus(DonationStatus.DELIVERED);

        } else if (newStatus == PickupStatus.CANCELLED) {

            donation.setStatus(DonationStatus.CANCELLED);
        }

        pickup.setStatus(newStatus);

        donationRepository.save(donation);

        return pickupRequestRepository.save(pickup);
    }
}