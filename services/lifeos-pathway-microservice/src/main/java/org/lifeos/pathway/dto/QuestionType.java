package org.lifeos.pathway.dto;

public enum QuestionType {
    MULTIPLE_CHOICE,
    YES_NO,
    OPEN_ENDED,
    DATE;
    public String getValue() {
        return this.name();
    }

    public static QuestionType fromValue(String value) {
        for (QuestionType questionType : QuestionType.values()) {
            if (questionType.getValue().equalsIgnoreCase(value)) {
                return questionType;
            }
        }
        throw new IllegalArgumentException("Unknown value: " + value);
    }
}
