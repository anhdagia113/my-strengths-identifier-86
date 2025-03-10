
package com.beautysalon.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.beautysalon.repositories.PaymentMethodRepository;
import com.beautysalon.repositories.PaymentRepository;
import com.beautysalon.repositories.UserRepository;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/seed")
public class SeedController {

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private UserRepository userRepository;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> seedDatabase() {
        Map<String, String> result = new HashMap<>();
        
        result.put("status", "success");
        result.put("message", "No seed data available. Please use data import feature instead.");
        
        return ResponseEntity.ok(result);
    }
}
