import {Question} from "@/types/QuizTypes/Question";
import {MultipleChoiceOption} from "@/types/QuizTypes/MultipleChoiceOption";

export interface MultipleChoiceQuestion extends Question {
  options: MultipleChoiceOption[]; // Array of options
}