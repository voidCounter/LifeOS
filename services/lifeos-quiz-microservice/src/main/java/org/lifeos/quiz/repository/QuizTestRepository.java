package org.lifeos.quiz.repository;

import org.lifeos.quiz.model.QuizTest;
import org.lifeos.quiz.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface QuizTestRepository extends JpaRepository<QuizTest, UUID> {
    List<QuizTest> findAllByUser(User user);
}
