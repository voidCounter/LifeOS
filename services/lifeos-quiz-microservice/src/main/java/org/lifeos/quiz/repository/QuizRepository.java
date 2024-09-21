package org.lifeos.quiz.repository;

import org.lifeos.quiz.dto.QuizDTO;
import org.lifeos.quiz.model.Quiz;
import org.lifeos.quiz.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, UUID> {
    Quiz findAllByQuizId(UUID quizId);

    List<Quiz> findAllByCreator(User creator);

    @Query(nativeQuery = true, value = "SELECT * FROM public.quizzes q order " +
            "by q.embedding <-> ? ::vector limit 5")
    List<Quiz> findAllBySearchQuery(float[] queryEmbedding);
}
