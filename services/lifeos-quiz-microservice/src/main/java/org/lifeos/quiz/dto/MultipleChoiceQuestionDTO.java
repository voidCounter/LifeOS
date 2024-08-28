package org.lifeos.quiz.dto;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;
import lombok.EqualsAndHashCode;


@JsonTypeName("MULTIPLE_CHOICE")
@EqualsAndHashCode(callSuper = true)
@Data
public class MultipleChoiceQuestionDTO extends QuestionDTO {
    private OptionDTO[] options;
}
