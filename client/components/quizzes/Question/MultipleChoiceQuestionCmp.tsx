import {MultipleChoiceQuestion} from "@/types/QuizTypes/MultipleChoiceQuestion";
import {MultipleChoiceOption} from "@/types/QuizTypes/MultipleChoiceOption";
import {Checkbox} from "@/components/ui/checkbox";
import BaseQuestionCmp from "./BaseQuestionCmp";
import {QuizMode} from "@/types/QuizTypes/QuizMode";
import {BaseQuestionProps} from "@/types/QuizTypes/BaseQuestionProps";
import QuestionOption from "./QuestionOption";
import {useRef, useState} from "react";
import MultipleChoiceQuestionEditCmp
    from "@/components/quizzes/Question/MultipleChoiceQuestionEditCmp";
import {QuestionType} from "@/types/QuizTypes/QuestionTypes";

interface MultipleChoiceQuestionCmpProps extends BaseQuestionProps<MultipleChoiceQuestion> {
}


export default function MultipleChoicequestionCmp({
                                                      index,
                                                      question,
                                                      mode = "View",
                                                      showEditingOption = false
                                                  }: MultipleChoiceQuestionCmpProps
) {
    const [questionMode, setQuestionMode] = useState(mode);
    if (questionMode === "Edit") {
        return (<MultipleChoiceQuestionEditCmp index={index} question={question}
                                               mode={mode}
                                               setQuestionMode={setQuestionMode}
                                               showEditingOption={showEditingOption}/>);
    }
    return (
        <BaseQuestionCmp index={index} question={question} mode={questionMode}
                         showEditingOption={showEditingOption}
                         setQuestionMode={(mode: QuizMode) => setQuestionMode(mode)}>
            {
                question.options.map((option, index) => (
                    <div key={question.questionId + option.optionId}
                         className={"w-full"}>
                        <QuestionOption
                            questionType={QuestionType.MULTIPLE_CHOICE}
                            questionId={question.questionId}
                            id={question.questionId + option.optionId}
                            option={option.optionText}
                            optionExplanation={option.optionExplanation}
                            isCorrect={option.correct} mode={questionMode}/>
                    </div>
                ))}
        </BaseQuestionCmp>
    );

}