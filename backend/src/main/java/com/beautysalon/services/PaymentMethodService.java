
package com.beautysalon.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beautysalon.exceptions.ResourceNotFoundException;
import com.beautysalon.models.PaymentMethod;
import com.beautysalon.models.User;
import com.beautysalon.repositories.PaymentMethodRepository;

@Service
public class PaymentMethodService {
    
    @Autowired
    private PaymentMethodRepository paymentMethodRepository;
    
    @Autowired
    private UserService userService;
    
    public List<PaymentMethod> findByUserId(Long userId) {
        return paymentMethodRepository.findByUserId(userId);
    }
    
    public PaymentMethod findById(Long id) {
        return paymentMethodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment method not found with id: " + id));
    }
    
    public PaymentMethod findByIdAndUserId(Long id, Long userId) {
        return paymentMethodRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment method not found with id: " + id));
    }
    
    @Transactional
    public PaymentMethod save(PaymentMethod paymentMethod, Long userId) {
        User user = userService.findById(userId);
        paymentMethod.setUser(user);
        
        // If this is the first payment method, make it default
        if (paymentMethodRepository.findByUserId(userId).isEmpty()) {
            paymentMethod.setDefault(true);
        }
        
        return paymentMethodRepository.save(paymentMethod);
    }
    
    @Transactional
    public void setDefault(Long id, Long userId) {
        // First, find the payment method
        PaymentMethod paymentMethod = findByIdAndUserId(id, userId);
        
        // Remove default status from all other methods
        List<PaymentMethod> userMethods = findByUserId(userId);
        for (PaymentMethod method : userMethods) {
            method.setDefault(false);
            paymentMethodRepository.save(method);
        }
        
        // Set this one as default
        paymentMethod.setDefault(true);
        paymentMethodRepository.save(paymentMethod);
    }
    
    @Transactional
    public void delete(Long id, Long userId) {
        PaymentMethod paymentMethod = findByIdAndUserId(id, userId);
        boolean wasDefault = paymentMethod.isDefault();
        
        paymentMethodRepository.delete(paymentMethod);
        
        // If the deleted method was the default, set a new default if possible
        if (wasDefault) {
            List<PaymentMethod> remainingMethods = findByUserId(userId);
            if (!remainingMethods.isEmpty()) {
                PaymentMethod newDefault = remainingMethods.get(0);
                newDefault.setDefault(true);
                paymentMethodRepository.save(newDefault);
            }
        }
    }
}
