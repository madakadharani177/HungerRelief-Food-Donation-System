package com.hungerrelief.service;

import com.hungerrelief.entity.Donation;
import com.hungerrelief.entity.DonationStatus;
import com.hungerrelief.entity.Ngo;
import com.hungerrelief.entity.PickupRequest;
import com.hungerrelief.entity.PickupStatus;
import com.hungerrelief.exception.BadRequestException;
import com.hungerrelief.exception.ResourceNotFoundException;
import com.hungerrelief.repository.DonationRepository;
import com.hungerrelief.repository.NgoRepository;
import com.hungerrelief.repository.PickupRequestRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NgoService {

    private final DonationRepository donationRepository;
    private final NgoRepository ngoRepository;
    private final PickupRequestRepository pickupRequestRepository;

    public NgoService(
            DonationRepository donationRepository,
            NgoRepository ngoRepository,
            PickupRequestRepository pickupRequestRepository) {

        this.donationRepository = donationRepository;
        this.ngoRepository = ngoRepository;
        this.pickupRequestRepository = pickupRequestRepository;
    }

    // Get donations that are available for NGO request
    public List<Donation> getAvailableDonations() {

        return donationRepository
                .findByStatusOrderByCreatedAtDesc(DonationStatus.AVAILABLE);
    }

    // NGO accepts/requests a donation
    public PickupRequest acceptDonation(
            Long donationId,
            Long ngoUserId) {

        Donation donation = donationRepository
                .findById(donationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Donation not found"));

        Ngo ngo = ngoRepository
                .findByUserId(ngoUserId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "NGO profile not found for this user"));

        if (donation.getStatus() != DonationStatus.AVAILABLE) {

            throw new BadRequestException(
                    "Donation is no longer available");
        }

        PickupRequest request = new PickupRequest();

        request.setDonation(donation);
        request.setNgo(ngo);

        // NGO has accepted the donation.
        // Volunteer will be assigned later.
        request.setStatus(PickupStatus.ACCEPTED);

        donation.setStatus(DonationStatus.ACCEPTED);

        donationRepository.save(donation);

        return pickupRequestRepository.save(request);
    }

    // Get NGO's accepted/requested donations
    public List<PickupRequest> getMyRequests(
            Long ngoUserId) {

        Ngo ngo = ngoRepository
                .findByUserId(ngoUserId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "NGO profile not found for this user"));

        return pickupRequestRepository
                .findByNgoIdOrderByRequestDateDesc(
                        ngo.getId());
    }
}