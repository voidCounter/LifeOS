import { HttpStatus } from "@/types/HttpStatus";
import { GeneratedQuestion, PathwayPromptType } from "@/types/PathwayTypes";
import { SimpleStageDTO, Stage } from "@/types/PathwayTypes/Pathway";
import { AxiosInstance } from "@/utils/AxiosInstance";


export async function generateQuestionByPrompt({
    prompt,
    language
}: {
    prompt: string;
    language: string;
}): Promise<GeneratedQuestion[]> {
    try {
        const response = await AxiosInstance.post("/pathway/generate-questions", {
            prompt,
            language
        });
        console.log("Response from generateQuestionByPrompt: ");
        console.log(response.data as GeneratedQuestion[]);

        return response.data;
    } catch (error) {
        throw new Error("Error generating question by prompt: " + error);
    }
}


export async function generateSubStage({
    type, 
    context,
    language, 
    parentId
}: PathwayPromptType): Promise<Stage[]> {
    try {
        const response = await AxiosInstance.post("/pathway/generate-substages", {
            type,
            context,
            language, 
            parentId
        });
        return response.data;
    } catch (error) {
        throw new Error("Error generating " + type + error);    
    }
}


export async function fetchStageById(stageId: string): Promise<Stage> {
    
    const response = await AxiosInstance.post(`/pathway/get`, {
        stageId: stageId
    });
    return response.data as Stage; 
}

export async function fetchPathwayByUserId() : Promise<SimpleStageDTO[]> {
    const respone = await AxiosInstance.get("/pathway/get-by-user");
    return respone.data as SimpleStageDTO[];
}