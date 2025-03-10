
package com.beautysalon.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.beautysalon.models.PaymentMethod;

@Repository
public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {
    
    List<PaymentMethod> findByUserId(Long userId);
    
    Optional<PaymentMethod> findByIdAndUserId(Long id, Long userId);
    
    @Query("SELECT pm FROM PaymentMethod pm WHERE pm.user.id = :userId AND pm.isDefault = true")
    Optional<PaymentMethod> findDefaultByUserId(@Param("userId") Long userId);
}
