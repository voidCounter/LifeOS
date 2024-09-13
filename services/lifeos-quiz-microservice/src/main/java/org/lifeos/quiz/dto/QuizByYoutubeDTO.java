package org.lifeos.quiz.dto;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@JsonTypeName("YOUTUBE")
@EqualsAndHashCode(callSuper = true)
@Data
public class QuizByYoutubeDTO extends QuizCreationDTO {
    private String youtubeUrl;
    private String prompt;
}
