package com.hungerrelief.repository;

import com.hungerrelief.entity.Donation;
import com.hungerrelief.entity.DonationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonationRepository extends JpaRepository<Donation, Long> {

    List<Donation> findByRestaurantIdOrderByCreatedAtDesc(Long restaurantId);

    List<Donation> findByStatusOrderByCreatedAtDesc(DonationStatus status);

    long countByStatus(DonationStatus status);
}