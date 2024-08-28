package org.lifeos.quiz.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class MultipleChoiceQuestion extends Question {
    @OneToMany(mappedBy = "question")
    private List<MultipleChoiceOption> options;
}
