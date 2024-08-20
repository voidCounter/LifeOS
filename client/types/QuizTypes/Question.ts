export interface Question {
  questionId: string;      // UUID
  questionStatement: string; // Question text
  createdAt?: string;      // Timestamp, can be null
  quizId?: string;         // UUID, can be null
  questionType?: string;   // Type of the question (e.g., MULTIPLE_CHOICE,
  // SHORT_ANSWER, TRUE_FALSE)
  questionDifficulty?: string; // Difficulty level
}
