package org.lifeos.ai.model;

public enum StageType {
    ROADMAP,
    MILESTONE,
    MODULE,
    TASK,
    QUIZ,
    PROJECT;

    public String getValue() {
        return switch (this){
            case QUIZ -> "QUIZ";
            case ROADMAP -> "ROADMAP";
            case MILESTONE -> "MILESTONE";
            case MODULE -> "MODULE";
            case TASK -> "TASK";
            case PROJECT -> "PROJECT";
        };
    }

    public static StageType fromValue(String value) {
        for (StageType stageType : StageType.values()) {
            if (stageType.getValue().equalsIgnoreCase(value)) {
                return stageType;
            }
        }
        throw new IllegalArgumentException("Unknown value: " + value);
    }
}