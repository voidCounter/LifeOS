package org.LifeOS.quiz.model;


import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

public enum QuizType {
    MULTIPLE_CHOICE,
    TRUE_FALSE,
    SHORT_ANSWER;


    public String getValue() {
        return switch (this) {
            case MULTIPLE_CHOICE -> "Multiple Choice";
            case TRUE_FALSE -> "True or false";
            case SHORT_ANSWER -> "Short answer";
        };
    }

    public String getName() {
        return this.name();
    }
}
