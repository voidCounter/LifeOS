package org.lifeos.user.service;

import org.lifeos.user.Exception.ExpiredRefreshTokenException;
import org.lifeos.user.model.RefreshToken;
import org.lifeos.user.repository.RefreshTokenRepository;
import org.lifeos.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    @Value("${refreshToken.expirationInSeconds}")
    private long refreshTokenExpirationInSeconds;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository,
                               UserRepository userRepository) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public RefreshToken createRefreshToken(String userEmail) {
        RefreshToken refreshToken =
                RefreshToken.builder().user(userRepository.findByEmail(userEmail))
                        .token(UUID.randomUUID().toString())
                        .expiryDate(new Timestamp(System.currentTimeMillis() + refreshTokenExpirationInSeconds * 1000))
                        .build();
        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshToken> findByToken(UUID tokenId) {
        return refreshTokenRepository.findById(tokenId);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Timestamp.from(Instant.now())) < 0) {
            refreshTokenRepository.delete(token);
            throw new ExpiredRefreshTokenException(token.getToken() + " Refresh token is expired. " +
                    "Please make a new login..!");
        }
        return token;
    }
}
