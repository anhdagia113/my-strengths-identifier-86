
package com.beautysalon.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "payment_methods")
@Data
public class PaymentMethod {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentMethodType type;
    
    @Column(nullable = false)
    private String name;
    
    @Column
    private String maskedNumber;
    
    @Column
    private String expiryDate;
    
    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean isDefault;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    public enum PaymentMethodType {
        CREDIT_CARD, BANK_ACCOUNT
    }
}
