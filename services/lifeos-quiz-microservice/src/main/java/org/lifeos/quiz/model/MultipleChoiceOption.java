package org.lifeos.quiz.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.lifeos.quiz.dto.OptionDTO;

import java.util.UUID;

@Entity
@Getter
@Setter
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
    @JsonBackReference
    private Question question;

    public static MultipleChoiceOption fromDTO(OptionDTO optionDTO, Question question) {
        MultipleChoiceOption option = new MultipleChoiceOption();
        option.setOptionText(optionDTO.getOptionText());
        option.setOptionExplanation(optionDTO.getOptionExplanation());
        option.setCorrect(optionDTO.isCorrect());
        option.setQuestion(question);
        return option;
    }
}
