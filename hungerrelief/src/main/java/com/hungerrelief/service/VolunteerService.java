package com.hungerrelief.service;

import com.hungerrelief.entity.Donation;
import com.hungerrelief.entity.DonationStatus;
import com.hungerrelief.entity.PickupRequest;
import com.hungerrelief.entity.PickupStatus;
import com.hungerrelief.entity.Volunteer;
import com.hungerrelief.exception.BadRequestException;
import com.hungerrelief.exception.ResourceNotFoundException;
import com.hungerrelief.repository.DonationRepository;
import com.hungerrelief.repository.PickupRequestRepository;
import com.hungerrelief.repository.VolunteerRepository;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VolunteerService {

    private final DonationRepository donationRepository;
    private final VolunteerRepository volunteerRepository;
    private final PickupRequestRepository pickupRequestRepository;

    public VolunteerService(
            DonationRepository donationRepository,
            VolunteerRepository volunteerRepository,
            PickupRequestRepository pickupRequestRepository) {

        this.donationRepository = donationRepository;
        this.volunteerRepository = volunteerRepository;
        this.pickupRequestRepository = pickupRequestRepository;
    }

    /*
     * Get donations that have been accepted/requested by an NGO
     * and are waiting for a volunteer.
     */
    public List<Donation> getAvailableDonations() {

        List<PickupRequest> requests =
                pickupRequestRepository
                        .findByStatusAndVolunteerIsNullOrderByRequestDateDesc(
                                PickupStatus.ACCEPTED
                        );

        List<Donation> donations = new ArrayList<>();

        for (PickupRequest request : requests) {

            if (request.getDonation() != null) {
                donations.add(request.getDonation());
            }
        }

        return donations;
    }

    /*
     * Volunteer accepts the pickup assignment.
     */
    public PickupRequest acceptPickup(
            Long donationId,
            Long volunteerUserId) {

        Volunteer volunteer =
                volunteerRepository
                        .findByUserId(volunteerUserId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Volunteer profile not found for this user"
                                )
                        );

        if (!Boolean.TRUE.equals(volunteer.getAvailability())) {

            throw new BadRequestException(
                    "Volunteer is currently unavailable"
            );
        }

        PickupRequest request =
                pickupRequestRepository
                        .findByDonationIdAndVolunteerIsNull(donationId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "No pickup request available for this donation"
                                )
                        );

        if (request.getStatus() != PickupStatus.ACCEPTED) {

            throw new BadRequestException(
                    "This donation is not ready for volunteer pickup"
            );
        }

        request.setVolunteer(volunteer);

        return pickupRequestRepository.save(request);
    }

    /*
     * Get all pickup requests assigned to this volunteer.
     */
    public List<PickupRequest> getMyPickups(Long volunteerUserId) {

        Volunteer volunteer =
                volunteerRepository
                        .findByUserId(volunteerUserId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Volunteer profile not found for this user"
                                )
                        );

        return pickupRequestRepository
                .findByVolunteerIdOrderByRequestDateDesc(
                        volunteer.getId()
                );
    }
}