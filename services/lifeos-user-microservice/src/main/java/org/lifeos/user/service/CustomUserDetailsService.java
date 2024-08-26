package org.lifeos.user.service;

import org.lifeos.user.model.CustomUserDetails;
import org.lifeos.user.model.User;
import org.lifeos.user.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User " + username + " not " +
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
