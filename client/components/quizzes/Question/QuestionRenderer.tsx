import MultipleChoicequestionCmp
    from "./MultipleChoiceQuestionCmp";
import {Question} from "@/types/QuizTypes/Question";
import {MultipleChoiceQuestion} from "@/types/QuizTypes/MultipleChoiceQuestion";
import TrueFalseQuestionCmp from "./TrueFalseQuestionCmp";
import {TrueFalseQuestion} from "@/types/QuizTypes/TrueFalseQuestion";
import ShortAnswerQuestionCmp
    from "./ShortAnswerQuestionCmp";
import {ShortAnswerQuestion} from "@/types/QuizTypes/ShortAnswerQuestion";
import {QuizMode} from "@/types/QuizTypes/QuizMode";
import {useQuizLearningStore} from "@/store/QuizLearningStore";

interface QuestionRendererProp {
    question: Question,
    mode: QuizMode,
    index: number,
    showEditingOption?: boolean,
}

export default function QuestionRenderer({
                                             question,
                                             index,
                                             mode,
                                             showEditingOption = false
                                         }: QuestionRendererProp) {
    switch (question.questionType) {
        case 'MULTIPLE_CHOICE':
            return <MultipleChoicequestionCmp
                index={index}
                mode={mode}
                showEditingOption={showEditingOption}
                question={question as MultipleChoiceQuestion}/>;

        case 'TRUE_FALSE':
            return <TrueFalseQuestionCmp
                mode={mode}
                index={index}
                showEditingOption={showEditingOption}
                question={question as TrueFalseQuestion}/>
        case 'SHORT_ANSWER':
            return <ShortAnswerQuestionCmp index={index}
                                           showEditingOption={showEditingOption}
                                           mode={mode}
                                           question={question as ShortAnswerQuestion}/>
        default:
            return null;
    }
}