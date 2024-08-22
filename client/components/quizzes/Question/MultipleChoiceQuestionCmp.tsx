import {MultipleChoiceQuestion} from "@/types/QuizTypes/MultipleChoiceQuestion";
import {MultipleChoiceOption} from "@/types/QuizTypes/MultipleChoiceOption";
import {Checkbox} from "@/components/ui/checkbox";
import BaseQuestionCmp from "./BaseQuestionCmp";
import {QuizMode} from "@/types/QuizTypes/QuizMode";
import {BaseQuestionProps} from "@/types/QuizTypes/BaseQuestionProps";
import QuestionOption from "./QuestionOption";

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
    return (
        <BaseQuestionCmp index={index} question={question} mode={mode}
                         showEditingOption={showEditingOption}>
            {
                question.options.map((option, index) => (
                    <div key={index} className={"w-full"}>
                        <QuestionOption option={option.optionText}
                                        optionExplanation={option.optionExplanation}
                                        isCorrect={option.correct} mode={mode}/>
                    </div>
                ))}
        </BaseQuestionCmp>
    );

}