package org.lifeos.quiz.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "multiple_choice_options")
public class MultipleChoiceOption {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID optionId;
    private String optionText;
    private String optionExplanation;
    private boolean correct;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
}
