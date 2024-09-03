package org.lifeos.user.repository;

import org.lifeos.user.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken,
        UUID> {
    void deleteByToken(String token);
}
