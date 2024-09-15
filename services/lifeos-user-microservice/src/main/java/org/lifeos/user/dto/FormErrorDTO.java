package org.lifeos.user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FormErrorDTO {
    private String field;
    private String message;
}
