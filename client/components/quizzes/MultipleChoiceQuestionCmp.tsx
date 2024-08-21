import {MultipleChoiceQuestion} from "@/types/QuizTypes/MultipleChoiceQuestion";
import {MultipleChoiceOption} from "@/types/QuizTypes/MultipleChoiceOption";
import {Checkbox} from "@/components/ui/checkbox";
import BaseQuestionCmp from "@/components/quizzes/BaseQuestionCmp";
import {QuizMode} from "@/types/QuizTypes/QuizMode";
import {BaseQuestionProps} from "@/types/QuizTypes/BaseQuestionProps";

interface MultipleChoiceQuestionCmpProps extends BaseQuestionProps<MultipleChoiceQuestion> {
}


interface MultipleChoiceOptionEditProps {
    option: MultipleChoiceOption,
    onChange: (option: MultipleChoiceOption) => void
}

const MultipleChoiceOptionEdit = ({
                                      option,
                                      onChange
                                  }: MultipleChoiceOptionEditProps) => {


}

export default function MultipleChoicequestionCmp({
                                                      index,
                                                      question,
                                                      mode = "View",
                                                      showEditingOption = false
                                                  }: MultipleChoiceQuestionCmpProps
) {
    const renderMultipleChoiceOption = (option: MultipleChoiceOption) => {
        switch (mode) {
            case "View":
                return (
                    <div className="flex items-center space-x-2">
                        <Checkbox id={option.optionId} disabled={true}
                                  className={"cursor-default"}/>
                        <label
                            htmlFor={option.optionId}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {option.optionText}
                        </label>
                    </div>);
        }
    }
    return (
        <BaseQuestionCmp index={index} question={question} mode={mode}
                         showEditingOption={showEditingOption}>
            {
                question.options.map((option, index) => (
                    <div key={index} className={""}>
                        {renderMultipleChoiceOption(option)}
                    </div>
                ))}
        </BaseQuestionCmp>
    );

}