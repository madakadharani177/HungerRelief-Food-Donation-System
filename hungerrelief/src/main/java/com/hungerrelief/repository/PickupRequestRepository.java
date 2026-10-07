package com.hungerrelief.repository;

import com.hungerrelief.entity.PickupRequest;
import com.hungerrelief.entity.PickupStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PickupRequestRepository
        extends JpaRepository<PickupRequest, Long> {

    List<PickupRequest> findByVolunteerIdOrderByRequestDateDesc(
            Long volunteerId);

    List<PickupRequest> findByNgoIdOrderByRequestDateDesc(
            Long ngoId);

    Optional<PickupRequest> findByDonationIdAndVolunteerId(
            Long donationId,
            Long volunteerId);

    Optional<PickupRequest> findByDonationIdAndVolunteerIsNull(
            Long donationId);

    boolean existsByDonationIdAndNgoId(
            Long donationId,
            Long ngoId);

    long countByStatus(PickupStatus status);

    List<PickupRequest> findByStatusAndVolunteerIsNullOrderByRequestDateDesc(
            PickupStatus status);
}