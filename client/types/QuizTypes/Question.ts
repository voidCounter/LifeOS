export interface Question {
    questionId: string;      // UUID
    questionStatement: string; // Question text
    createdAt?: string;      // Timestamp, can be null
    quizId?: string;         // UUID, can be null
    questionType?: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER",
    // SHORT_ANSWER, TRUE_FALSE)
    questionDifficulty?: string; // Difficulty level
}

export interface LocalQuestion extends Question {
    index: number;
}
