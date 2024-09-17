package org.lifeos.ai.dto.pathway;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;
import java.util.Optional;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Question {
    private String type;
    private String question;
    private List<String> options;
}
