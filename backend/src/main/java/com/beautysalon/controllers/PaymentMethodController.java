
package com.beautysalon.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.beautysalon.models.PaymentMethod;
import com.beautysalon.models.User;
import com.beautysalon.services.PaymentMethodService;
import com.beautysalon.services.UserService;

@RestController
@RequestMapping("/api/users/me/payment-methods")
public class PaymentMethodController {
    
    @Autowired
    private PaymentMethodService paymentMethodService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<PaymentMethod>> getUserPaymentMethods(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        List<PaymentMethod> paymentMethods = paymentMethodService.findByUserId(user.getId());
        return ResponseEntity.ok(paymentMethods);
    }
    
    @PostMapping
    public ResponseEntity<PaymentMethod> addPaymentMethod(
        @RequestBody PaymentMethod paymentMethod,
        Authentication authentication
    ) {
        User user = userService.findByEmail(authentication.getName());
        PaymentMethod savedPaymentMethod = paymentMethodService.save(paymentMethod, user.getId());
        return ResponseEntity.ok(savedPaymentMethod);
    }
    
    @PutMapping("/{id}/default")
    public ResponseEntity<Void> setDefaultPaymentMethod(
        @PathVariable Long id,
        Authentication authentication
    ) {
        User user = userService.findByEmail(authentication.getName());
        paymentMethodService.setDefault(id, user.getId());
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaymentMethod(
        @PathVariable Long id,
        Authentication authentication
    ) {
        User user = userService.findByEmail(authentication.getName());
        paymentMethodService.delete(id, user.getId());
        return ResponseEntity.ok().build();
    }
}
