import {Question} from "./Question";

export interface TrueFalseQuestion extends Question{
  trueOptionExplanation: string; // Explanation for the true option
  falseOptionExplanation?: string; // Explanation for the false option, can
  // be null
  answer?: boolean;          // The correct answer (true/false)
  answerExplanation?: string; // Explanation for the answer, can be null
}
