package org.lifeos.quiz.dto;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.lifeos.quiz.model.MultipleChoiceQuestion;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.stream.Collectors;


@JsonTypeName("MULTIPLE_CHOICE")
@EqualsAndHashCode(callSuper = true)
@Data
public class MultipleChoiceQuestionDTO extends QuestionDTO {
    private List<OptionDTO> options;

    public static MultipleChoiceQuestionDTO fromModel(MultipleChoiceQuestion question) {
        MultipleChoiceQuestionDTO dto = new MultipleChoiceQuestionDTO();
        dto.setQuestionStatement(question.getQuestionStatement());
        dto.setQuestionDifficulty(question.getQuestionDifficulty().name());
        dto.setQuestionType(question.getQuestionType().name());

        // Convert options
        List<OptionDTO> optionDTOs = question.getOptions().stream()
                .map(OptionDTO::fromModel)
                .collect(Collectors.toList());
        dto.setOptions(optionDTOs);
        return dto;
    }
}
