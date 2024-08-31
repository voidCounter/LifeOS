import {z} from "zod";
import {QuizCreationOptionType} from "@/config/QuizCreationTabsConfig";

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["doc", "docx", "pdf", "ppt", "pptx", "xls", "xlsx", "txt"];

const baseQuizCreationSchema = z.object({
    quizTitle: z.string().min(5).max(100).optional().default(""),
    quizDescription: z.string().min(10).max(500).optional().default(""),
    visibility: z.enum(["PUBLIC", "PRIVATE"]).optional().default("PUBLIC"),
    questionType: z.enum(["MULTIPLE_CHOICE", "TRUE_FALSE", "SHORT_ANSWER", "MIX"]).default("MULTIPLE_CHOICE"),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD", "MIX"]).default("MIX"),
    language: z.enum(["English", "Hindi", "Spanish"]).default("English"),
    numberOfQuestions: z.enum(["5", "10", "15", "20"]).default("10"),
})

export const getQuizCreationSchema = (quizCreationType: QuizCreationOptionType) => {
    switch (quizCreationType) {
        case "Prompt":
            return baseQuizCreationSchema.extend({
                prompt: z.string().min(10).max(500),
            })
        case "Note":
            return baseQuizCreationSchema.extend({
                notes: z.instanceof(File).refine((file) => {
                    return !file || file.size <= MAX_UPLOAD_SIZE;
                }, "Max file size is 5MB").refine((file) => {
                    if (!file) return true;
                    const fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase();
                    return ACCEPTED_FILE_TYPES.includes(fileExtension);
                }, `File type not supported. Supported file types are ${ACCEPTED_FILE_TYPES.join(", ")}`),
            })
        case "Article":
            return baseQuizCreationSchema.extend({
                articleUrl: z.string().url("Invalid Article URL"),
            })
        case "Youtube":
            return baseQuizCreationSchema.extend({
                youtubeUrl: z.string().url("Invalid Youtube URL"),
            })
    }
}
