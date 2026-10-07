package com.hungerrelief.repository;

import com.hungerrelief.entity.Ngo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NgoRepository extends JpaRepository<Ngo, Long> {

    Optional<Ngo> findByUserId(Long userId);
}