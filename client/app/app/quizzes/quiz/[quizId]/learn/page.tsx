"use client";
import {useQuery} from "@tanstack/react-query";
import {fetchQuizwithQuestions} from "@/api-handlers/quizzes";
import {Quiz} from "@/types/QuizTypes/Quiz";
import {
    Carousel, CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {Card, CardContent} from "@/components/ui/card";
import QuestionRenderer from "@/components/quizzes/Question/QuestionRenderer";
import {useEffect, useState} from "react";
import {Progress} from "@/components/ui/progress";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useQuizLearningStore} from "@/store/QuizLearningStore";

interface LearnQuizProps {
    quizId: string
}

export default function LearnQuiz({params}: { params: LearnQuizProps }) {

    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)


    const router = useRouter();

    console.log("current: ", current, count);


    const revealAnswer = useQuizLearningStore((state) => state.revealAnswer);
    const setRevealAnswer = useQuizLearningStore(state => state.setRevealAnswer);
    const currentlyLearningQuestion = useQuizLearningStore(state => state.currentlyLearningQuestion);
    const setCurrentlyLearningQuestion = useQuizLearningStore(state => state.setCurrentlyLearningQuestion);


    const {data: quiz, isLoading, error} = useQuery<Quiz, Error>({
        queryKey: [`quiz-${params.quizId}`], queryFn: fetchQuizwithQuestions
    });

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length);
        setCurrentlyLearningQuestion(quiz?.questions?.[api.selectedScrollSnap()]?.quizId ?? "");
        setRevealAnswer(false);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api, current, quiz?.questions, setCurrentlyLearningQuestion, setRevealAnswer]);


    if (isLoading) return <div>...Loading</div>
    if (error) return <div>{error.message}</div>
    if (quiz == undefined) return <div>...Loading</div>

    return (<div
        className={"flex flex-col w-full justify-center" +
            " overflow-hidden no-scrollbar" +
            " items-center"}>

        <div className={"w-full flex flex-col pt-20" +
            " h-full" +
            " px-12" +
            " items-center gap-10"}>

            <Carousel setApi={setApi}
                      className="w-full min-h-fit border-transparent shadow-none">
                <CarouselContent className={"border-0"}>
                    {quiz?.questions?.map((question, index) => (
                        <CarouselItem key={index}
                                      className={"border-0 max-h-fit" +
                                          " overflow-hidden"}
                        >
                            <Card className={"border-0 w-full min-h-52 flex" +
                                "  items-center" +
                                " shadow-none"}>
                                <CardContent
                                    className="flex w-full items-center p-2">
                                    <QuestionRenderer question={question}
                                                      mode={"Learning"}
                                                      index={index}/>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>

            {/* buttons */}
            <div className={"fixed flex flex-col gap-2 bottom-16" +
                " w-fit h-fit" +
                " border shadow-lg bg-background rounded-lg overflow-hidden"}>
                <div className={"flex flex-row gap-4 p-2 w-fit"}>
                    <Button
                        onClick={() => setRevealAnswer()}>{revealAnswer ? "Hide Answer" : "Reveal Answer"}</Button>
                    <Button variant={"ghost"}
                            onClick={() => router.push(`/app/quizzes/quiz/${quiz.quizId}`)}>Finish
                        Learning</Button>
                </div>
            </div>
        </div>
    </div>)
}