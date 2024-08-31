import {QuizCreationOptionType} from "@/config/QuizCreationTabsConfig";

export default function CreateQuiz({params}: {
    params: { tab: QuizCreationOptionType }
}) {
    return (
        <div>Create by {params.tab}</div>
    );
}
