import MultipleChoicequestionCmp
    from "@/components/quizzes/MultipleChoiceQuestionCmp";
import {Question} from "@/types/QuizTypes/Question";
import {MultipleChoiceQuestion} from "@/types/QuizTypes/MultipleChoiceQuestion";
import TrueFalseQuestionCmp from "@/components/quizzes/TrueFalseQuestionCmp";
import {TrueFalseQuestion} from "@/types/QuizTypes/TrueFalseQuestion";
import ShortAnswerQuestionCmp
    from "@/components/quizzes/ShortAnswerQuestionCmp";
import {ShortAnswerQuestion} from "@/types/QuizTypes/ShortAnswerQuestion";
import {QuizMode} from "@/types/QuizTypes/QuizMode";

interface QuestionRendererProp {
    questions: Question[],
    mode: QuizMode,
    showEditingOption?: boolean,
}

export default function QuestionRenderer({
                                             questions,
                                             mode,
                                             showEditingOption = false
                                         }: QuestionRendererProp) {
    return questions?.map((question, index) => {
        switch (question.questionType) {
            case 'MULTIPLE_CHOICE':
                return <MultipleChoicequestionCmp
                    index={index}
                    mode={mode}
                    showEditingOption = {showEditingOption}
                    question={question as MultipleChoiceQuestion}/>;

            case 'TRUE_FALSE':
                return <TrueFalseQuestionCmp
                    mode={mode}
                    index={index}
                    showEditingOption = {showEditingOption}
                    question={question as TrueFalseQuestion}/>
            case 'SHORT_ANSWER':
                return <ShortAnswerQuestionCmp index={index}
                                               showEditingOption = {showEditingOption}
                                               mode={mode}
                                               question={question as ShortAnswerQuestion}/>
            default:
                return null;
        }
    })
}