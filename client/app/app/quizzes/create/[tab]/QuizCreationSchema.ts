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

const promptSchema =
    z.string().min(MIN_PROMPT_ALLOWED, {
        message: `Minimum ${MIN_PROMPT_ALLOWED} characters required`,
    }).max(MAX_PROMPT_ALLOWED,
        {message: `Maximum ${MAX_PROMPT_ALLOWED} characters allowed`});

const baseQuizCreationSchema = z.object({
    questionsType:
        z.enum(["MULTIPLE_CHOICE", "TRUE_FALSE", "SHORT_ANSWER", "MIX"]).default("MULTIPLE_CHOICE"),
    questionsDifficulty:
        z.enum(["EASY", "MEDIUM", "HARD", "MIX"]).default("MIX"),
    language:
        z.string().default("English"),
    numberOfQuestions:
        z.enum(["5", "10", "15", "20"]).default("10"),
})


const noteSchema = baseQuizCreationSchema.extend({
    note: z.instanceof(File).refine((file) => {
        return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "Max file size is 5MB").refine((file) => {
        if (!file) return true;
        const fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase();
        return ACCEPTED_FILE_TYPES.includes(fileExtension);
    }, `File type not supported. Supported file types are ${ACCEPTED_FILE_TYPES.join(", ")}`),
});

const promptQuizCreationSchema = baseQuizCreationSchema.extend({
    creationMethod: z.enum(["PROMPT"]).default("PROMPT"),
    prompt: promptSchema
});

const articleQuizCreationSchema = baseQuizCreationSchema.extend({
    creationMethod: z.enum(["ARTICLE"]).default("ARTICLE"),
    articleUrl: z.string().url("Invalid Article URL").default(""),
    prompt: promptSchema.optional()
})

const youtubeQuizCreationSchema = baseQuizCreationSchema.extend({
    creationMethod: z.enum(["YOUTUBE"]).default("YOUTUBE"),
    youtubeUrl: z.string().url("Invalid Youtube URL").default(""),
    prompt: promptSchema.optional()
});

const noteQuizCreationSchema = baseQuizCreationSchema.extend({
    creationMethod: z.enum(["NOTE"]).default("NOTE"),
    notes: z.array(noteSchema).min(MIN_FILE_ALLOWED, {
        message: `Minimum ${MIN_FILE_ALLOWED} file required`,
    }).max(MAX_FILE_ALLOWED, {
        message: `Maximum ${MAX_FILE_ALLOWED} files allowed`,
    }),
    prompt: promptSchema.optional()
});

export const quizCreationSchema = z.discriminatedUnion("creationMethod", [
    promptQuizCreationSchema,
    articleQuizCreationSchema,
    youtubeQuizCreationSchema,
    noteQuizCreationSchema,
]);