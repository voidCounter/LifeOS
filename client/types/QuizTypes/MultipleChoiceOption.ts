export interface MultipleChoiceOption {
  questionId?: string;      // UUID
  optionText?: string;     // Option text, can be null
  optionExplanation?: string; // Explanation for the option, can be null
  correct: boolean;        // Whether the option is correct
  optionId?: string;        // UUID
}
