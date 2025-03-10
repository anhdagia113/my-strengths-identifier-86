
package com.beautysalon.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.beautysalon.models.PaymentMethod;
import com.beautysalon.models.Payment;
import com.beautysalon.models.User;
import com.beautysalon.repositories.PaymentMethodRepository;
import com.beautysalon.repositories.PaymentRepository;
import com.beautysalon.repositories.UserRepository;
import com.beautysalon.services.PaymentMethodService;
import com.beautysalon.services.PaymentService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class DatabaseController {

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PaymentMethodService paymentMethodService;
    
    @Autowired
    private PaymentService paymentService;

    @DeleteMapping("/data")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> clearAllData() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Get the admin user to preserve it
            Optional<User> adminUser = userRepository.findByEmail("admin@beautysalon.com");
            
            if (adminUser.isPresent()) {
                User user = adminUser.get();
                
                // Clear all payment methods for the user
                paymentMethodRepository.deleteAll(paymentMethodRepository.findByUser(user));
                
                // Clear all payments for the user
                paymentRepository.deleteAll(paymentRepository.findByUser(user));
                
                response.put("status", "success");
                response.put("message", "All data has been cleared successfully");
            } else {
                response.put("status", "error");
                response.put("message", "Admin user not found");
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Error clearing data: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/data/export")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> exportData() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Get the admin user
            Optional<User> adminUser = userRepository.findByEmail("admin@beautysalon.com");
            
            if (adminUser.isPresent()) {
                User user = adminUser.get();
                
                // Get all payment methods for the user
                List<PaymentMethod> paymentMethods = paymentMethodRepository.findByUser(user);
                
                // Get all payments for the user
                List<Payment> payments = paymentRepository.findByUser(user);
                
                // Create export data structure
                Map<String, Object> exportData = new HashMap<>();
                exportData.put("paymentMethods", paymentMethods);
                exportData.put("payments", payments);
                
                return ResponseEntity.ok(exportData);
            } else {
                response.put("status", "error");
                response.put("message", "Admin user not found");
                return ResponseEntity.badRequest().body(response);
            }
            
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Error exporting data: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/data/import")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> importData(@RequestBody Map<String, Object> importData) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Get the admin user
            Optional<User> adminUser = userRepository.findByEmail("admin@beautysalon.com");
            
            if (adminUser.isPresent()) {
                User user = adminUser.get();
                
                // Clear existing data first
                paymentMethodRepository.deleteAll(paymentMethodRepository.findByUser(user));
                paymentRepository.deleteAll(paymentRepository.findByUser(user));
                
                // Import payment methods
                if (importData.containsKey("paymentMethods")) {
                    List<Map<String, Object>> paymentMethodsList = (List<Map<String, Object>>) importData.get("paymentMethods");
                    
                    for (Map<String, Object> methodData : paymentMethodsList) {
                        PaymentMethod method = new PaymentMethod();
                        method.setType(PaymentMethod.PaymentMethodType.valueOf((String) methodData.get("type")));
                        method.setName((String) methodData.get("name"));
                        method.setMaskedNumber((String) methodData.get("maskedNumber"));
                        method.setExpiryDate((String) methodData.get("expiryDate"));
                        method.setDefault((Boolean) methodData.get("isDefault"));
                        method.setUser(user);
                        
                        paymentMethodRepository.save(method);
                    }
                }
                
                // Import payments
                if (importData.containsKey("payments")) {
                    List<Map<String, Object>> paymentsList = (List<Map<String, Object>>) importData.get("payments");
                    
                    for (Map<String, Object> paymentData : paymentsList) {
                        Payment payment = new Payment();
                        payment.setTransactionId((String) paymentData.get("transactionId"));
                        
                        // Handle number conversions properly
                        if (paymentData.get("amount") instanceof Integer) {
                            payment.setAmount(java.math.BigDecimal.valueOf((Integer) paymentData.get("amount")));
                        } else if (paymentData.get("amount") instanceof Double) {
                            payment.setAmount(java.math.BigDecimal.valueOf((Double) paymentData.get("amount")));
                        }
                        
                        payment.setPaymentDate(java.time.LocalDateTime.now());
                        payment.setStatus(Payment.PaymentStatus.valueOf((String) paymentData.get("status")));
                        payment.setPaymentMethod((String) paymentData.get("paymentMethod"));
                        payment.setDescription((String) paymentData.get("description"));
                        payment.setUser(user);
                        
                        paymentRepository.save(payment);
                    }
                }
                
                response.put("status", "success");
                response.put("message", "Data imported successfully");
                return ResponseEntity.ok(response);
            } else {
                response.put("status", "error");
                response.put("message", "Admin user not found");
                return ResponseEntity.badRequest().body(response);
            }
            
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Error importing data: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
