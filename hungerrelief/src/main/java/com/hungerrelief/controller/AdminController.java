package com.hungerrelief.controller;

import com.hungerrelief.entity.Donation;
import com.hungerrelief.entity.User;
import com.hungerrelief.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(
                adminService.getUsers());
    }

    @GetMapping("/donations")
    public ResponseEntity<List<Donation>> getDonations() {
        return ResponseEntity.ok(
                adminService.getDonations());
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Long>> getDashboard() {
        return ResponseEntity.ok(
                adminService.getDashboard());
    }
}