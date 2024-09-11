import {Checkbox} from "@/components/ui/checkbox";
import {QuizMode} from "@/types/QuizTypes/QuizMode";
import {useEffect, useState} from "react";
import {useQuizLearningStore} from "@/store/QuizLearningStore";

interface QuestionOptionProps {
    id: string
    option: string | undefined,
    optionExplanation: string | undefined,
    isCorrect: boolean | undefined,
    mode: QuizMode,
}

export default function QuestionOption({
                                           id,
                                           option,
                                           optionExplanation,
                                           isCorrect,
                                           mode
                                       }: QuestionOptionProps) {
    const [checked, setChecked] = useState(false);
    const revealAnswer = useQuizLearningStore(state => state.revealAnswer);
    const setRevealAnswer = useQuizLearningStore(state => state.setRevealAnswer);
    if (option === "Gitanjal") {
        console.log(id);
    }
    useEffect(() => {
        setChecked(false);
    }, [revealAnswer]);
    switch (mode) {
        case "View":
            return (
                <div className="flex items-center space-x-2">
                    <Checkbox id={id} disabled={true}
                              className={"cursor-default"}/>
                    <label
                        htmlFor={id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {option}
                    </label>

                </div>)
        case "Learning":
            return (
                <div className={"flex flex-col gap-2 w-full"}>
                    <div
                        className={`flex items-center space-x-2 w-full ${checked && (isCorrect ? "text-success-foreground" : "text-destructive")}
                        ${revealAnswer && isCorrect && "text-success-foreground"}`}>
                        <Checkbox id={id}
                                  className={`cursor-default ${checked && (isCorrect ? "bg-success-foreground" : "bg-destructive")}
                                  ${revealAnswer && isCorrect && "text-success-foreground"}
                                  `}
                                  onCheckedChange={(checked) => {
                                      setRevealAnswer(false);
                                      if (checked) {
                                          setChecked(true);
                                      } else setChecked(false);
                                  }}
                                  checked={revealAnswer ? (isCorrect) : checked}
                        />
                        <label
                            htmlFor={id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full"
                        >
                            {option}
                        </label>
                    </div>
                    {
                        <div
                            className={`w-full flex flex-col gap-1 transition-all duration-500 ease-in-out overflow-hidden max-h-0 opacity-0 ${(checked || (revealAnswer && isCorrect)) ? 'max-h-32 opacity-100 mb-4' : ''}`}>
                            <hr className={"w-full"}/>
                            <div
                                className={`text-muted-foreground w-full text-sm overflow-y-scroll`}>
                                {optionExplanation}
                            </div>
                        </div>
                    }

                </div>
            );
    }

}
