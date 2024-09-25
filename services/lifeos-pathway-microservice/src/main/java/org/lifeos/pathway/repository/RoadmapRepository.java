package org.lifeos.pathway.repository;

import org.lifeos.pathway.model.Roadmap;
import org.lifeos.pathway.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface RoadmapRepository extends JpaRepository<Roadmap, UUID> {

    @Query("SELECT r FROM Roadmap r WHERE r.creator.userId = ?1")
    List<Roadmap> findByCreator_UserId(UUID userId);
}
