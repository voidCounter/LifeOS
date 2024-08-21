import {TrueFalseQuestion} from "@/types/QuizTypes/TrueFalseQuestion";
import {MultipleChoiceOption} from "@/types/QuizTypes/MultipleChoiceOption";
import {Checkbox} from "@/components/ui/checkbox";
import BaseQuestionCmp from "@/components/quizzes/BaseQuestionCmp";
import {QuizMode} from "@/types/QuizTypes/QuizMode";
import {BaseQuestionProps} from "@/types/QuizTypes/BaseQuestionProps";

interface TrueFalseQuestionCmpProps extends BaseQuestionProps<TrueFalseQuestion> {
}


export default function TrueFalseQuestionCmp({
                                                 question,
                                                 mode,
                                                 index,
                                                 showEditingOption
                                             }: TrueFalseQuestionCmpProps) {

    const trueFalseQuestionOptions = [
        {
            optionText: "True",
            optionExplanation: question.trueOptionExplanation,
        },
        {
            optionText: "False",
            optionExplanation: question.falseOptionExplanation
        }
    ];
    const renderTrueFalseOption = (option: string, optionExplanation: string) => {
        switch (mode) {
            case 'View':
                return (
                    <div className="flex items-center space-x-2">
                        <Checkbox id={option} disabled={true}/>
                        <label
                            htmlFor={option}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {option}
                        </label>
                    </div>);
        }
    }

    return (
        <BaseQuestionCmp index={index} question={question} mode={mode}
                         showEditingOption={showEditingOption}>
            {
                trueFalseQuestionOptions.map((option) => {
                    return (
                        <div
                            key={option.optionText}>{renderTrueFalseOption(option.optionText, option?.optionExplanation ?? "")}</div>)
                })
            }
        </BaseQuestionCmp>
    );
}