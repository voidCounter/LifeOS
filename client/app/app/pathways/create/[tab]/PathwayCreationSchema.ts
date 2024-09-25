import {z} from "zod";
import { PathwayCreationType } from "@/types/PathwayTypes/PathwayCreationType";

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["doc", "docx", "pdf", "ppt", "pptx", "xls", "xlsx", "txt"];
const MIN_FILE_ALLOWED = 1;
const MAX_FILE_ALLOWED = 3;
const MIN_PROMPT_ALLOWED = 10;
const MAX_PROMPT_ALLOWED = 500;


const promptSchema =
    z.string().min(MIN_PROMPT_ALLOWED, {
        message: `Minimum ${MIN_PROMPT_ALLOWED} characters required`,
    }).max(MAX_PROMPT_ALLOWED,
        {message: `Maximum ${MAX_PROMPT_ALLOWED} characters allowed`});

const basePathwayCreationSchema = z.object({
    language: 
        z.string().default("English"),
    prompt: promptSchema
})

const promptPathwayCreationSchema = basePathwayCreationSchema.extend({
    creationMethod: z.enum(["PROMPT"]).default("PROMPT"),
});

const filePathwayCreationSchema = basePathwayCreationSchema.extend({
    creationMethod: z.enum(["FILE"]).default("FILE"),
    file: z.instanceof(File).refine((file) => {
        return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "Max file size is 5MB").refine((file) => {
        if (!file) return true;
        const fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase();
        return ACCEPTED_FILE_TYPES.includes(fileExtension);
    }, `File type not supported. Supported file types are ${ACCEPTED_FILE_TYPES.join(", ")}`),
});

export const pathwayCreationSchema = z.discriminatedUnion("creationMethod", [
    promptPathwayCreationSchema, 
    filePathwayCreationSchema
]);