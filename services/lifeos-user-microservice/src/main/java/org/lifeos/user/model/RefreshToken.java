package org.lifeos.user.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "refresh_tokens")
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID tokenId;
    private String token;
    private Timestamp expiryDate;

    @CreationTimestamp
    private Timestamp issuedAt;

    @OneToOne
    @JoinColumn(name = "user_Id", referencedColumnName = "user_id")
    private User user;
}
