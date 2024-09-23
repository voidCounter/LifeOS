package org.lifeos.ai.dto.quiz;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@JsonTypeName("NOTE")
@Data
public class QuizByNotesDTO extends QuizCreationDTO {
    private List<String> files;
    private String prompt;
}

