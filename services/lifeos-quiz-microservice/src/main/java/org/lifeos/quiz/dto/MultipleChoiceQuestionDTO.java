package org.lifeos.quiz.dto;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.swing.text.html.Option;
import java.util.List;


@JsonTypeName("MULTIPLE_CHOICE")
@EqualsAndHashCode(callSuper = true)
@Data
public class MultipleChoiceQuestionDTO extends QuestionDTO {
    private List<OptionDTO> options;
}
