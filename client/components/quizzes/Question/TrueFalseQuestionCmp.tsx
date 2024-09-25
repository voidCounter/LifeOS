import {TrueFalseQuestion} from "@/types/QuizTypes/TrueFalseQuestion";
import BaseQuestionCmp from "./BaseQuestionCmp";
import {BaseQuestionProps} from "@/types/QuizTypes/BaseQuestionProps";
import QuestionOption from "./QuestionOption";
import {useState} from "react";
import {QuizMode} from "@/types/QuizTypes/QuizMode";
import TrueFalseQuestionEditCmp
    from "@/components/quizzes/Question/TrueFalseQuestionEditCmp";
import {QuestionType} from "@/types/QuizTypes/QuestionTypes";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {useQuizTestStore} from "@/store/QuizTestStore";

interface TrueFalseQuestionCmpProps extends BaseQuestionProps<TrueFalseQuestion> {
}


export default function TrueFalseQuestionCmp({
                                                 question,
                                                 mode = "View",
                                                 index,
                                                 showEditingOption,
                                             }: TrueFalseQuestionCmpProps) {
    const {handleAnswerChange, questionsInQuizTest} = useQuizTestStore();

    const [questionMode, setQuestionMode] = useState(mode);

    const trueFalseQuestionOptions = [
        {
            optionText: "True",
            optionExplanation: question.trueOptionExplanation,
            isCorrect: true == question.answer
        },
        {
            optionText: "False",
            optionExplanation: question.falseOptionExplanation,
            isCorrect: false == question.answer

        }
    ];
    if (questionMode === "Edit") {
        return <TrueFalseQuestionEditCmp index={index} question={question}
                                         mode={mode}
                                         setQuestionMode={setQuestionMode}
                                         showEditingOption={showEditingOption}/>;
    }

    return (
        <BaseQuestionCmp index={index} question={question} mode={questionMode}
                         showEditingOption={showEditingOption}
                         setQuestionMode={(mode: QuizMode) => setQuestionMode(mode)}>
            {
                (mode == "Learning" || mode == "View") &&
                trueFalseQuestionOptions.map((option) => {
                    return (
                        <QuestionOption
                            questionId={question.questionId}
                            questionType={QuestionType.TRUE_FALSE}
                            key={question.questionId + option.optionText}
                            id={question.questionId + option.optionText}
                            option={option.optionText}
                            optionExplanation={option.optionExplanation}
                            isCorrect={option.isCorrect}
                            mode={questionMode}/>)
                })}

            {
                mode == "Test" &&
                <RadioGroup
                    defaultValue={questionsInQuizTest.find((item) => item.questionId === question.questionId)?.userAnswer[0] as string}
                    onValueChange={(value) => handleAnswerChange(question.questionId, value as string, QuestionType.TRUE_FALSE)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="True"
                                        id={question.questionId + "-true"}/>
                        <Label
                            htmlFor={question.questionId + "-true"}>True</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="False"
                                        id={question.questionId + "-false"}/>
                        <Label
                            htmlFor={question.questionId + "-false"}>False</Label>
                    </div>
                </RadioGroup>
            }
        </BaseQuestionCmp>
    );
}