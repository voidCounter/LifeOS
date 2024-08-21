import Image from "next/image";
import {Quiz} from "@/types/QuizTypes/Quiz";
import {Badge} from "@/components/ui/badge";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {
    CalendarFold,
    CalendarFoldIcon,
    MoreHorizontalIcon,
    MoreVerticalIcon
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {QuizTest} from "@/types/QuizTypes/QuizTest";
import {formatRelativeTime} from "@/lib/formatRelativetime";
import {usePathname, useRouter} from "next/navigation";
import {UserAvatar} from "@/components/UserAvatar";
import QuizRating from "@/components/quizzes/QuizRating";

interface QuizProps {
    quiz: Quiz,
    quizTest?: QuizTest,
    variant?: "default" | "popularByStudy" | "createdByMe" | "quizTest" | null,
    showRating?: boolean,
    showCategories?: boolean,
    showQuestionCount?: boolean,
    showCreator?: boolean,
}

export default function QuizCard({
                                     quiz,
                                     quizTest,
                                     variant = "default",
                                     showRating = true,
                                     showQuestionCount = true,
                                     showCategories = true,
                                     showCreator = true,
                                 }: QuizProps) {

    const router = useRouter();

    function cardClickHandler() {
        router.push(`/quizzes/quiz/${quiz.quizId}/`)
    }

    return (
        <div
            className="w-full h-fit p-4 bg-background rounded-xl border border-border flex-col justify-start items-start gap-4 inline-flex cursor-pointer hover:bg-accent/50"
            onClick={cardClickHandler}>
            <div
                className="self-stretch h-14 flex-col justify-start items-start gap-3 flex">
                {/* Quiz title */}
                <div
                    className="self-stretch h-6 flex-row justify-start items-start gap-1 flex">
                    <div
                        className="w-full text-foreground text-lg font-normal leading-normal">{quiz.quizTitle}</div>
                    <div>{
                        variant == "createdByMe" &&
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button size={"icon"} variant={"ghost"}>
                                    <MoreVerticalIcon strokeWidth={2}
                                                      className={"w-5 h-5"}></MoreVerticalIcon>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem
                                >Schedule</DropdownMenuItem>
                                <DropdownMenuItem
                                >Edit</DropdownMenuItem>
                                <DropdownMenuItem
                                    className={"text-destructive hover:text-destructive"}
                                >Delete</DropdownMenuItem>

                            </DropdownMenuContent>

                        </DropdownMenu>
                    }
                        {
                            variant == "quizTest" &&
                            <div
                                className={`${((quizTest?.quizTestScore ?? 0) < (quizTest?.quiz.questionCount ?? 0) / 2) ? "bg-destructive" : "bg-success-foreground"} text-sm text-background px-2 py-1 rounded-sm`}>
                                {quizTest?.quizTestScore ?? 0}/{quizTest?.quiz.questionCount}
                            </div>
                        }
                    </div>
                </div>
                {/* info + rating */}
                <div className="justify-start items-center gap-2 inline-flex">
                    {showQuestionCount && <Badge
                        variant={"outline"}>{quiz.questionCount} questions </Badge>}
                    {
                        showCategories &&
                        <Badge variant={"outline"}>{quiz.category}</Badge>
                    }
                    {
                        showRating &&
                        <QuizRating rating={"4.5"}/>
                    }
                </div>
            </div>
            {
                variant == "createdByMe" &&
                <div className="flex items-center space-x-2">
                    <Switch id="visibility"/>
                    <Label htmlFor={"visibility"}>Public</Label>
                </div>
            }
            {
                (variant != "createdByMe" && (showCreator)) &&
                <UserAvatar
                    avatarURL={"https://images.unsplash.com/photo-1533636721434-0e2d61030955?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    name={quiz.user.username} userName={quiz.user.username}/>
            }
            {
                variant == "quizTest" &&
                <div
                    className="h-4 justify-start items-center gap-1 inline-flex">
                    <CalendarFoldIcon
                        className="w-4 h-4 text-muted-foreground"></CalendarFoldIcon>
                    <div
                        className="text-center text-muted-foreground text-xs font-normal mt-0.5 leading-none">{formatRelativeTime(quizTest?.testTakenAt ?? "")}</div>
                </div>
            }

        </div>
    );
}