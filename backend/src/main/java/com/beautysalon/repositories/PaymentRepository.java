
package com.beautysalon.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.beautysalon.models.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    // Add custom queries here if needed
}
