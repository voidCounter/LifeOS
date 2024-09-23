package org.lifeos.ai.dto.quiz;


import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@JsonTypeName("ARTICLE")
@EqualsAndHashCode(callSuper = true)
public class QuizByArticleDTO extends QuizCreationDTO {
    private String articleUrl;
    private String prompt;
}

