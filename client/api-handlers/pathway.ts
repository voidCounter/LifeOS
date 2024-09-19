import { HttpStatus } from "@/types/HttpStatus";
import { GeneratedQuestion, PathwayPromptType } from "@/types/PathwayTypes";
import { AxiosInstance } from "@/utils/AxiosInstance";


export async function generateQuestionByPrompt({
    prompt,
    language
} : PathwayPromptType): Promise<GeneratedQuestion[] | undefined> {    
    try {
        const response = await AxiosInstance.post("/pathway/generate-questions", {
            prompt,
            language
        });
        console.log("Response from generateQuestionByPrompt: ");
        console.log(response.data as GeneratedQuestion[]);

        return response.data; 
    } catch (error) {
        console.error("[pathway.ts] Error parsing pathway data," + error);
        return undefined;
    }
}

export async function generatePathwaysFromAnswer({
    prompt, 
    language
} : PathwayPromptType) : Promise<string | undefined> {
    try {
        const response = await AxiosInstance.post("/pathway/generate-pathways", {
            prompt,
            language
        });
        return response.data;
    } catch (error) {
        console.log("[pathway.ts] Error generating pathways from answer: " + error);
        return undefined;
    }
}