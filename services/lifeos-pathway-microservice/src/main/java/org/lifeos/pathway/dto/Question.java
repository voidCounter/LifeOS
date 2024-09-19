package org.lifeos.pathway.dto;



import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Question {
    private QuestionType type;
    private String question;
    private List<String> options;
}
