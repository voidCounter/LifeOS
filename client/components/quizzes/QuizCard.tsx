import Image from "next/image";
import {Quiz} from "@/types/QuizTypes/Quiz";
import {Badge} from "@/components/ui/badge";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {MoreHorizontalIcon, MoreVerticalIcon} from "lucide-react";
import {ContextMenu} from "@radix-ui/react-context-menu";
import {
    ContextMenuContent, ContextMenuItem,
    ContextMenuTrigger
} from "@/components/ui/context-menu";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface QuizProps {
    quiz: Quiz,
    variant?: "default" | "popularByStudy" | "createdByMe" | null,
    showCategory?: boolean | null,
    showRating?: boolean | null,
    showAvatar?: boolean | null,
    visibilityOption?: boolean | null,
}

export default function QuizCard({
                                     quiz,
                                     variant = "default",
                                     showCategory = true,
                                     showRating = true,
                                     showAvatar = true,
                                     visibilityOption = false
                                 }: QuizProps) {
    return (
        <div
            className="w-full h-fit p-4 bg-background rounded-xl border border-border flex-col justify-start items-start gap-4 inline-flex">
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
                                <DropdownMenuItem className={"text-destructive hover:text-destructive"}
                                >Delete</DropdownMenuItem>

                            </DropdownMenuContent>

                        </DropdownMenu>
                    }
                    </div>
                </div>
                {/* info + rating */}
                <div className="justify-start items-center gap-2 inline-flex">
                    <Badge variant={"outline"}>{"56 questions"} </Badge>
                    {showCategory && <Badge variant={"outline"}>{quiz.category}</Badge>}
                    <div
                        className="text-center text-foreground text-xs font-normal leading-none">⭐
                        4.83
                    </div>
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
                variant != "createdByMe" &&
                <div
                    className="self-stretch justify-start items-center gap-2 inline-flex">
                    {/* User avatar */}
                    <Image alt={"avatar"} className="w-7 h-7 rounded-full"
                           width={7}
                           height={8}
                           src="https://images.unsplash.com/photo-1533636721434-0e2d61030955?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>

                    {/* User name */}
                    <div
                        className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                        <div
                            className="text-foreground text-sm font-light leading-none">Eva
                            Mendes
                        </div>
                    </div>
                </div>
            }

        </div>
    );
}