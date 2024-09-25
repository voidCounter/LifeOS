package org.lifeos.pathway.repository;

import org.lifeos.pathway.model.Stage;
import org.lifeos.pathway.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface StageRepository extends JpaRepository<Stage, UUID> {


}
