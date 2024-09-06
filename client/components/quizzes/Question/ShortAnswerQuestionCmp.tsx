import {ShortAnswerQuestion} from "@/types/QuizTypes/ShortAnswerQuestion";
import BaseQuestionCmp from "./BaseQuestionCmp";
import {QuizMode} from "@/types/QuizTypes/QuizMode";
import {BaseQuestionProps} from "@/types/QuizTypes/BaseQuestionProps";
import {useQuizLearningStore} from "@/store/QuizLearningStore";
import {useState} from "react";
import ShortAnswerQuestionEditCmp
    from "@/components/quizzes/Question/ShortAnswerQuestionEditCmp";

interface ShortAnswerQuestionCmpProp extends BaseQuestionProps<ShortAnswerQuestion> {
}

const renderShortAnswer = (question: ShortAnswerQuestion, mode: QuizMode) => {

    const revealAnswer = useQuizLearningStore.getState().revealAnswer;
    switch (mode) {
        case 'View':
            return null;
        case 'Learning':
            return (<div
                className={`transition-all duration-500  ease-in-out overflow-hidden ${revealAnswer ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                {question.answer}
                <div
                    className={`flex flex-col gap-1 mt-1`}>
                    <hr className={"w-full"}/>
                    <div
                        className={"text-muted-foreground text-sm overflow-y-scroll"}>
                        {question.answerExplanation}
                    </div>
                </div>
            </div>);
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
    const [questionMode, setQuestionMode] = useState(mode);
    if (questionMode === "Edit") {
        return <ShortAnswerQuestionEditCmp index={index} question={question}
                                           mode={mode}
                                           showEditingOption={showEditingOption}
                                           setQuestionMode={setQuestionMode}/>
    }

    return (
        <BaseQuestionCmp index={index} question={question} mode={mode}
                         showEditingOption={showEditingOption}
                         setQuestionMode={(mode: QuizMode) => setQuestionMode(mode)}>
            {renderShortAnswer(question, mode)}
        </BaseQuestionCmp>
    );
}