package org.lifeos.gateway.service;

import org.lifeos.gateway.model.User;
import org.lifeos.gateway.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserById(UUID userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.orElse(null);
    }
}
