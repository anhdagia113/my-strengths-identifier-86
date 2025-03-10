
package com.beautysalon.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.beautysalon.models.Role;
import com.beautysalon.models.User;
import com.beautysalon.repositories.RoleRepository;
import com.beautysalon.repositories.UserRepository;
import com.beautysalon.exceptions.ResourceNotFoundException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    
    public List<User> findAll() {
        return userRepository.findAll();
    }
    
    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }
    
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public User registerUser(User user) {
        // Assign default role
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Default role not found"));
        
        user.setRoles(Collections.singleton(userRole));
        
        return userRepository.save(user);
    }
    
    public User save(User user) {
        return userRepository.save(user);
    }
    
    public User update(User user) {
        User existingUser = findById(user.getId());
        // Update fields
        // Don't update password here
        return userRepository.save(user);
    }
    
    public void deleteById(Long id) {
        User user = findById(id);
        userRepository.delete(user);
    }
}
