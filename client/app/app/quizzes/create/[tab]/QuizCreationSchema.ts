import {z} from "zod";
import {QuizCreationOptionType} from "@/config/QuizCreationTabsConfig";

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["doc", "docx", "pdf", "ppt", "pptx", "xls", "xlsx", "txt"];
const MIN_FILE_ALLOWED = 1;
const MAX_FILE_ALLOWED = 3;
const MIN_PROMPT_ALLOWED = 10;
const MAX_PROMPT_ALLOWED = 500;

const quizInformationSchema = z.object({
    quizTitle: z.string().min(5).max(100).optional().default(""),
    quizDescription: z.string().min(10).max(500).optional().default(""),
    visibility: z.enum(["PUBLIC", "PRIVATE"]).optional().default("PUBLIC"),

});

const baseQuizCreationSchema = z.object({
    questionType: z.enum(["MULTIPLE_CHOICE", "TRUE_FALSE", "SHORT_ANSWER", "MIX"]).default("MULTIPLE_CHOICE"),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD", "MIX"]).default("MIX"),
    language: z.enum(["English", "Hindi", "Spanish"]).default("English"),
    numberOfQuestions: z.enum(["5", "10", "15", "20"]).default("10"),
})

const noteSchema = z.object({
    note: z.instanceof(File).refine((file) => {
        return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "Max file size is 5MB").refine((file) => {
        if (!file) return true;
        const fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase();
        return ACCEPTED_FILE_TYPES.includes(fileExtension);
    }, `File type not supported. Supported file types are ${ACCEPTED_FILE_TYPES.join(", ")}`),
});

export const getQuizCreationSchema = (quizCreationType: QuizCreationOptionType) => {
    switch (quizCreationType) {
        case "Prompt":
            return baseQuizCreationSchema.extend({
                prompt: z.string().min(MIN_PROMPT_ALLOWED, {
                    message: `Minimum ${MIN_PROMPT_ALLOWED} characters required`,
                }).max(MAX_PROMPT_ALLOWED,
                    {message: `Maximum ${MAX_PROMPT_ALLOWED} characters allowed`}),
            })
        case "Note":
            return baseQuizCreationSchema.extend({
                notes: z.array(noteSchema).min(MIN_FILE_ALLOWED, {
                    message: `Minimum ${MIN_FILE_ALLOWED} file required`,
                }).max(MAX_FILE_ALLOWED, {
                    message: `Maximum ${MAX_FILE_ALLOWED} files allowed`,
                }),
            })
        case "Article":
            return baseQuizCreationSchema.extend({
                articleUrl: z.string().url("Invalid Article URL"),
            })
        case "Youtube":
            return baseQuizCreationSchema.extend({
                youtubeUrl: z.string().url("Invalid Youtube URL"),
            })
        default:
            return baseQuizCreationSchema;
    }
}
