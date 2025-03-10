
package com.beautysalon.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.beautysalon.models.PaymentMethod;
import com.beautysalon.models.PaymentMethod.PaymentMethodType;
import com.beautysalon.models.Payment;
import com.beautysalon.models.Payment.PaymentStatus;
import com.beautysalon.models.User;
import com.beautysalon.repositories.PaymentMethodRepository;
import com.beautysalon.repositories.PaymentRepository;
import com.beautysalon.repositories.UserRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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
        
        try {
            // Seed payment methods and payments for the first user (admin)
            Optional<User> adminUser = userRepository.findByEmail("admin@beautysalon.com");
            
            if (adminUser.isPresent()) {
                User user = adminUser.get();
                
                // Clear existing data first
                paymentMethodRepository.deleteAll(paymentMethodRepository.findByUser(user));
                paymentRepository.deleteAll(paymentRepository.findByUser(user));
                
                // Create payment methods
                PaymentMethod visa = new PaymentMethod();
                visa.setType(PaymentMethodType.CREDIT_CARD);
                visa.setName("Visa");
                visa.setMaskedNumber("****1234");
                visa.setExpiryDate("05/25");
                visa.setDefault(true);
                visa.setUser(user);
                paymentMethodRepository.save(visa);
                
                PaymentMethod mastercard = new PaymentMethod();
                mastercard.setType(PaymentMethodType.CREDIT_CARD);
                mastercard.setName("Mastercard");
                mastercard.setMaskedNumber("****5678");
                mastercard.setExpiryDate("08/24");
                mastercard.setDefault(false);
                mastercard.setUser(user);
                paymentMethodRepository.save(mastercard);
                
                // Create payments/transactions
                Payment payment1 = new Payment();
                payment1.setTransactionId("TX12345");
                payment1.setAmount(new BigDecimal("450000"));
                payment1.setPaymentDate(LocalDateTime.now().minusDays(30));
                payment1.setStatus(PaymentStatus.COMPLETED);
                payment1.setPaymentMethod("Visa ****1234");
                payment1.setDescription("Chăm sóc da cơ bản");
                payment1.setUser(user);
                paymentRepository.save(payment1);
                
                Payment payment2 = new Payment();
                payment2.setTransactionId("TX12346");
                payment2.setAmount(new BigDecimal("650000"));
                payment2.setPaymentDate(LocalDateTime.now().minusDays(60));
                payment2.setStatus(PaymentStatus.COMPLETED);
                payment2.setPaymentMethod("Mastercard ****5678");
                payment2.setDescription("Trị mụn chuyên sâu");
                payment2.setUser(user);
                paymentRepository.save(payment2);
                
                Payment payment3 = new Payment();
                payment3.setTransactionId("TX12347");
                payment3.setAmount(new BigDecimal("850000"));
                payment3.setPaymentDate(LocalDateTime.now().minusDays(90));
                payment3.setStatus(PaymentStatus.COMPLETED);
                payment3.setPaymentMethod("Visa ****1234");
                payment3.setDescription("Trẻ hóa da");
                payment3.setUser(user);
                paymentRepository.save(payment3);
                
                Payment payment4 = new Payment();
                payment4.setTransactionId("TX12348");
                payment4.setAmount(new BigDecimal("350000"));
                payment4.setPaymentDate(LocalDateTime.now().minusDays(120));
                payment4.setStatus(PaymentStatus.FAILED);
                payment4.setPaymentMethod("Mastercard ****5678");
                payment4.setDescription("Massage mặt");
                payment4.setUser(user);
                paymentRepository.save(payment4);
                
                Payment payment5 = new Payment();
                payment5.setTransactionId("TX12349");
                payment5.setAmount(new BigDecimal("250000"));
                payment5.setPaymentDate(LocalDateTime.now().minusDays(150));
                payment5.setStatus(PaymentStatus.REFUNDED);
                payment5.setPaymentMethod("Visa ****1234");
                payment5.setDescription("Tẩy trang chuyên sâu");
                payment5.setUser(user);
                paymentRepository.save(payment5);
                
                // Return all the created data for reference
                Map<String, Object> seededData = new HashMap<>();
                seededData.put("paymentMethods", paymentMethodRepository.findByUser(user));
                seededData.put("payments", paymentRepository.findByUser(user));
                
                result.put("status", "success");
                result.put("message", "Database seeded successfully");
                
                return ResponseEntity.ok(seededData);
            } else {
                result.put("status", "error");
                result.put("message", "Admin user not found");
                return ResponseEntity.badRequest().body(result);
            }
            
        } catch (Exception e) {
            result.put("status", "error");
            result.put("message", "Error seeding database: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(result);
        }
    }
}
