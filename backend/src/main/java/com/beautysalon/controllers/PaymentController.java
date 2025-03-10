
package com.beautysalon.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.beautysalon.models.Payment;
import com.beautysalon.models.User;
import com.beautysalon.services.PaymentService;
import com.beautysalon.services.UserService;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    
    @Autowired
    private PaymentService paymentService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(paymentService.findAll());
    }
    
    @GetMapping("/paged")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<Payment>> getPagedPayments(Pageable pageable) {
        return ResponseEntity.ok(paymentService.findAll(pageable));
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isPaymentOwner(authentication, #id)")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
        Payment payment = paymentService.findById(id);
        return ResponseEntity.ok(payment);
    }
    
    @GetMapping("/by-status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Payment>> getPaymentsByStatus(
        @PathVariable Payment.PaymentStatus status
    ) {
        return ResponseEntity.ok(paymentService.findByStatus(status));
    }
    
    @GetMapping("/by-date-range")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Payment>> getPaymentsByDateRange(
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
    ) {
        return ResponseEntity.ok(paymentService.findByDateRange(startDate, endDate));
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
        Payment savedPayment = paymentService.save(payment);
        return ResponseEntity.ok(savedPayment);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @RequestBody Payment payment) {
        payment.setId(id);
        Payment updatedPayment = paymentService.save(payment);
        return ResponseEntity.ok(updatedPayment);
    }
    
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Payment> updatePaymentStatus(
        @PathVariable Long id, 
        @RequestParam Payment.PaymentStatus status
    ) {
        Payment updatedPayment = paymentService.updatePaymentStatus(id, status);
        return ResponseEntity.ok(updatedPayment);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        paymentService.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
    // User specific endpoints
    @GetMapping("/user")
    public ResponseEntity<List<Payment>> getUserPayments(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        List<Payment> payments = paymentService.findByUserId(user.getId());
        return ResponseEntity.ok(payments);
    }
    
    @GetMapping("/user/paged")
    public ResponseEntity<Page<Payment>> getUserPagedPayments(Authentication authentication, Pageable pageable) {
        User user = userService.findByEmail(authentication.getName());
        Page<Payment> payments = paymentService.findByUserId(user.getId(), pageable);
        return ResponseEntity.ok(payments);
    }
    
    @GetMapping("/user/by-status/{status}")
    public ResponseEntity<List<Payment>> getUserPaymentsByStatus(
        Authentication authentication,
        @PathVariable Payment.PaymentStatus status
    ) {
        User user = userService.findByEmail(authentication.getName());
        List<Payment> payments = paymentService.findByUserIdAndStatus(user.getId(), status);
        return ResponseEntity.ok(payments);
    }
    
    @GetMapping("/user/by-date-range")
    public ResponseEntity<List<Payment>> getUserPaymentsByDateRange(
        Authentication authentication,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
    ) {
        User user = userService.findByEmail(authentication.getName());
        List<Payment> payments = paymentService.findByUserIdAndDateRange(user.getId(), startDate, endDate);
        return ResponseEntity.ok(payments);
    }
    
    @PostMapping("/user")
    public ResponseEntity<Payment> createUserPayment(
        @RequestBody Payment payment,
        Authentication authentication
    ) {
        User user = userService.findByEmail(authentication.getName());
        Payment savedPayment = paymentService.createPayment(payment, user.getId());
        return ResponseEntity.ok(savedPayment);
    }
}
