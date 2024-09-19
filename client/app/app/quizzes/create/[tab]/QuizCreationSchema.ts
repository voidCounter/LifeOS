import {z} from "zod";
import {QuizCreationOptionType} from "@/config/QuizCreationTabsConfig";

const MAX_UPLOAD_SIZE = 2 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["doc", "docx", "pdf", "ppt", "pptx", "xls", "xlsx", "txt", "epub"];
const MIN_FILE_ALLOWED = 1;
const MAX_FILE_ALLOWED = 2;
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
    youtubeUrl: z.string().refine((url) => {
        const standardYoutubeRegex = /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/;
        const shortenedYoutubeRegex = /^https:\/\/youtu\.be\/[\w-]+(\?.*)?$/;
        return standardYoutubeRegex.test(url) || shortenedYoutubeRegex.test(url)
    }, {
        message: "Invalid youtube URL format. It should be" +
            " https://www.youtube.com/watch?v={VIDEO_ID} or" +
            " https://youtu.be/{VIDEO_ID}?..."
    }),
    prompt: promptSchema.optional()
});

const noteFilesSchema = z.array(z.string());

const noteQuizCreationSchema = baseQuizCreationSchema.extend({
    creationMethod: z.enum(["NOTE"]).default("NOTE"),
    files: z.array(z.instanceof(File)).refine((files: Array<File>) => {
            return files.length >= MIN_FILE_ALLOWED && files.length <= MAX_FILE_ALLOWED;
        },
        `Minimum ${MIN_FILE_ALLOWED} and Maximum ${MAX_FILE_ALLOWED} files allowed`
    ).refine((files: Array<File>) => {
            return files.every((file) => file.size <= MAX_UPLOAD_SIZE);
        },
        `File size must be less than ${MAX_UPLOAD_SIZE / 1024 / 1024}MB`
    ).refine((files: Array<File>) => {
            return files.every(file => {
                const fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase();
                console.log(fileExtension);
                return ACCEPTED_FILE_TYPES.includes(fileExtension);
            })
        },
        `File type not supported. Supported file types are ${ACCEPTED_FILE_TYPES.join(", ")}`
    ).or(noteFilesSchema),
    prompt: promptSchema.optional()
});

export const quizCreationSchema = z.discriminatedUnion("creationMethod", [
    promptQuizCreationSchema,
    articleQuizCreationSchema,
    youtubeQuizCreationSchema,
    noteQuizCreationSchema,
]);