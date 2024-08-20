import {Question} from "./Question";

export interface ShortAnswerQuestion extends Question{
  answer: string;           // The answer text
  answerExplanation?: string; // Explanation for the answer, can be null
}
