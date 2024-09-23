package org.lifeos.ai.dto.quiz;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@JsonTypeName("YOUTUBE")
@Data
public class QuizByYoutubeDTO extends QuizCreationDTO {
    private String youtubeUrl;
    private String prompt;
}
