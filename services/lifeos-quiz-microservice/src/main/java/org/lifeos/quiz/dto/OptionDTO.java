package org.lifeos.quiz.dto;

import lombok.Data;
import org.lifeos.quiz.model.MultipleChoiceOption;

@Data
public class OptionDTO {
    private String optionId;
    private String optionText;
    private boolean isCorrect;
    private String optionExplanation;

    public static OptionDTO fromModel(MultipleChoiceOption option) {
        OptionDTO dto = new OptionDTO();
        dto.setOptionId(option.getOptionId().toString());
        dto.setOptionText(option.getOptionText());
        dto.setOptionExplanation(option.getOptionExplanation());
        dto.setCorrect(option.isCorrect());

        return dto;
    }
}
