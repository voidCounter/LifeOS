import {ShortAnswerQuestion} from "@/types/QuizTypes/ShortAnswerQuestion";
import {Question} from "@/types/QuizTypes/Question";
import BaseQuestionCmp from "@/components/quizzes/BaseQuestionCmp";
import {QuizMode} from "@/types/QuizTypes/QuizMode";
import {BaseQuestionProps} from "@/types/QuizTypes/BaseQuestionProps";

interface ShortAnswerQuestionCmpProp extends BaseQuestionProps<ShortAnswerQuestion> {
}

const renderShortAnswer = (question: Question, mode: string) => {
    switch (mode) {
        case 'View':
            return null;
        case 'Edit':
            return <div>Edit</div>
        default:
            return null;
    }
}

export default function ShortAnswerQuestionCmp({
                                                   question,
                                                   mode,
                                                   index,
                                                   showEditingOption
                                               }: ShortAnswerQuestionCmpProp) {
    return (
        <BaseQuestionCmp index={index} question={question} mode={mode}
                         showEditingOption={showEditingOption}>
            {renderShortAnswer(question, mode)}
        </BaseQuestionCmp>
    );
}