package org.LifeOS.quiz.dto;

import lombok.Data;

@Data
public class OptionDTO {
    private String optionText;
    private boolean isCorrect;
    private String optionExplanation;
}
