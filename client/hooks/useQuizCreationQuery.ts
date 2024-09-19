import {AxiosInstance} from "@/utils/AxiosInstance";
import {useMutation, useQuery} from "@tanstack/react-query";
import {QuizCreationOptionType} from "@/config/QuizCreationTabsConfig";
import {Quiz} from "@/types/QuizTypes/Quiz";
import {z} from "zod";
import {
    quizCreationSchema
} from "@/app/app/quizzes/create/[tab]/QuizCreationSchema";
import {useQuizCreationStore} from "@/store/QuizCreationStore";
import {toast} from "sonner";

const generateQuiz = async (url: string, data: z.infer<typeof quizCreationSchema>) => {
    const response = await AxiosInstance.post(url, data);
    console.log(response.data);
    return response.data;
}


export const useQuizCreationMutation = (quizCreationMethod: QuizCreationOptionType) => {
    let url = '/quiz/create';
    return useMutation<Quiz, Error, z.infer<typeof quizCreationSchema>>({
        mutationFn: (data: z.infer<typeof quizCreationSchema>) => generateQuiz(url, data),
        onMutate: (data) => {
            toast.loading('Generating quiz');
        },
        onSuccess: (data) => {
            toast.success('Quiz created successfully');
            if (data && data.questions) {
                data.questions.forEach((question) => {
                    useQuizCreationStore.getState().loadQuestion(question);
                })
            }
        },
        onError: (error) => {
            toast.error('Failed to create quiz! Try again.');
        },
        onSettled: () => {
            toast.dismiss();
        }
    });
}