import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import SaveQuizForm from "@/components/quizzes/Quiz/SaveQuizForm";

export default function SaveQuizDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild={true}>
                <Button variant={"outline"} size={"sm"}>
                    Save quiz
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Save the quiz</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <SaveQuizForm/>
            </DialogContent>
        </Dialog>);
}