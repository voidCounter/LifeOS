package org.LifeOS.quiz.model;

public enum QuizDifficulty {
    EASY,
    MEDIUM,
    HARD;

    public String getValue() {
        return switch (this) {
            case EASY -> "Easy";
            case MEDIUM -> "Medium";
            case HARD -> "Hard";
        };
    }
}
