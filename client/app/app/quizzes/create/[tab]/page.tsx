import {QuizCreationOptionType} from "@/config/QuizCreationTabsConfig";
import QuizCreationForm from "@/app/app/quizzes/create/QuizCreationForm";

export default function CreateQuiz({params}: {
    params: { tab: QuizCreationOptionType }
}) {
    return (
        <div>
            <QuizCreationForm quizCreationMethod={params.tab}/>
        </div>
    );
}
