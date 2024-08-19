package org.LifeOS.quiz.repository;

import org.LifeOS.quiz.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, UUID> {
    Quiz findAllByQuizId(UUID quizId);
}
