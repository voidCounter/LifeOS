package org.lifeos.gateway.service;

import org.lifeos.gateway.model.CustomUserDetails;
import org.lifeos.gateway.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.lifeos.gateway.repository.UserRepository;

import java.util.Optional;
import java.util.UUID;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public CustomUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User " + email + " not " +
                    "found");
        }
        return new CustomUserDetails(user);
    }

    public CustomUserDetails loadUserByUserId(String userId) throws UsernameNotFoundException {
        Optional<User> user =
                userRepository.findById(UUID.fromString(userId));
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User " + userId + " not " +
                    "found");
        }
        return new CustomUserDetails(user.get());
    }
}
