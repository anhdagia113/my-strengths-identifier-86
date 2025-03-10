
package com.beautysalon.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beautysalon.models.Payment;
import com.beautysalon.models.User;
import com.beautysalon.repositories.PaymentRepository;
import com.beautysalon.exceptions.ResourceNotFoundException;

@Service
public class PaymentService {
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private UserService userService;
    
    public List<Payment> findAll() {
        return paymentRepository.findAll();
    }
    
    public Page<Payment> findAll(Pageable pageable) {
        return paymentRepository.findAll(pageable);
    }
    
    public Payment findById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + id));
    }
    
    public List<Payment> findByUserId(Long userId) {
        return paymentRepository.findByUserId(userId);
    }
    
    public Page<Payment> findByUserId(Long userId, Pageable pageable) {
        return paymentRepository.findByUserId(userId, pageable);
    }
    
    public List<Payment> findByUserIdAndDateRange(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        return paymentRepository.findByUserIdAndDateRange(userId, startDate, endDate);
    }
    
    public List<Payment> findByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return paymentRepository.findByDateRange(startDate, endDate);
    }
    
    public List<Payment> findByStatus(Payment.PaymentStatus status) {
        return paymentRepository.findByStatus(status);
    }
    
    public List<Payment> findByUserIdAndStatus(Long userId, Payment.PaymentStatus status) {
        return paymentRepository.findByUserIdAndStatus(userId, status);
    }
    
    @Transactional
    public Payment createPayment(Payment payment, Long userId) {
        User user = userService.findById(userId);
        payment.setUser(user);
        
        // Generate a transaction ID if not provided
        if (payment.getTransactionId() == null || payment.getTransactionId().isEmpty()) {
            payment.setTransactionId("TX" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        
        // Set payment date if not provided
        if (payment.getPaymentDate() == null) {
            payment.setPaymentDate(LocalDateTime.now());
        }
        
        return paymentRepository.save(payment);
    }
    
    @Transactional
    public Payment updatePaymentStatus(Long id, Payment.PaymentStatus status) {
        Payment payment = findById(id);
        payment.setStatus(status);
        return paymentRepository.save(payment);
    }
    
    @Transactional
    public void deleteById(Long id) {
        Payment payment = findById(id);
        paymentRepository.delete(payment);
    }
}
