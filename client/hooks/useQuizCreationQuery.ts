import {AxiosInstance} from "@/utils/AxiosInstance";
import {useMutation, useQuery} from "@tanstack/react-query";
import {QuizCreationOptionType} from "@/config/QuizCreationTabsConfig";
import {Quiz} from "@/types/QuizTypes/Quiz";
import {z} from "zod";
import {
    quizCreationSchema
} from "@/app/app/quizzes/create/[tab]/QuizCreationSchema";
import {useQuizCreationStore} from "@/store/QuizCreationStore";

const generateQuiz = async (url: string, data: z.infer<typeof quizCreationSchema>) => {
    const response = await AxiosInstance.post(url, data);
    return response.data;
    // wait 5 seconds before calling axios.get('/Quiz.json');
    // return new Promise<Quiz>((resolve) => {
    //     setTimeout(() => {
    //         resolve(axios.get<Quiz>('/GeneratedQuiz.json').then((response) => response.data));
    //     }, 5000);
    // });
}


export const useQuizCreationQuery = () => {
    useQuery({
        queryKey: ['created_quiz'],
    })
}

export const useQuizCreationMutation = (quizCreationMethod: QuizCreationOptionType) => {
    let url = '';
    switch (quizCreationMethod) {
        case "prompt":
            url = '/quiz/create/byprompt';
            break;
        case "article":
            url = '/quiz/create/byarticle';
            break;
        case "youtube":
            url = '/quiz/create/byyoutube';
            break;
        default:
            break;
    }
    return useMutation<Quiz, Error, z.infer<typeof quizCreationSchema>>({
        mutationFn: (data: z.infer<typeof quizCreationSchema>) => generateQuiz(url, data),
        onSuccess: (data) => {
            if (data && data.questions) {
                data.questions.forEach((question) => {
                    useQuizCreationStore.getState().loadQuestion(question);
                })
            }
        },
        onError: (error) => {
            console.log('Failed to create quiz', error);
        }
    });
}