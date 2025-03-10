
package com.beautysalon.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.beautysalon.models.Payment;
import com.beautysalon.repositories.PaymentRepository;
import com.beautysalon.exceptions.ResourceNotFoundException;

@Service
public class PaymentService {
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    public List<Payment> findAll() {
        return paymentRepository.findAll();
    }
    
    public Payment findById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + id));
    }
    
    public Payment save(Payment payment) {
        return paymentRepository.save(payment);
    }
    
    public Payment update(Payment payment) {
        Payment existingPayment = findById(payment.getId());
        // Update fields here
        return paymentRepository.save(payment);
    }
    
    public void deleteById(Long id) {
        Payment payment = findById(id);
        paymentRepository.delete(payment);
    }
}
