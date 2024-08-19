package org.LifeOS.quiz.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
public class MultipleChoiceQuestion extends Question {
    @OneToMany(mappedBy = "question")
    private List<MultipleChoiceOption> options;
}
