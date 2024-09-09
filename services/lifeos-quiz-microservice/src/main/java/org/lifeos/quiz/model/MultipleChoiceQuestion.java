package org.lifeos.quiz.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.lifeos.quiz.dto.MultipleChoiceQuestionDTO;
import org.lifeos.quiz.dto.OptionDTO;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@Table(name = "multiple_choice_questions")
@JsonTypeName("MULTIPLE_CHOICE")
public class MultipleChoiceQuestion extends Question {
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<MultipleChoiceOption> options;

    public static MultipleChoiceQuestion fromDTO(MultipleChoiceQuestionDTO dto) {
        MultipleChoiceQuestion question = new MultipleChoiceQuestion();
        // set specific options
        question.setOptions(dto.getOptions().stream().map(optionDTO -> MultipleChoiceOption.fromDTO(optionDTO, question)).collect(Collectors.toList()));
        return question;
    }
}
