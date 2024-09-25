import { GeneratedQuestion, PathwayPromptType } from "@/types/PathwayTypes";
import { PublishDTO, SimpleStageDTO, Stage, SubStageCountDTO, TaskGenerationDTO } from "@/types/PathwayTypes/Pathway";
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


export async function fetchStageById({
    type,
    context,
    language,
    parentId
}: PathwayPromptType): Promise<Stage> {

    const response = await AxiosInstance.post(`/pathway/get`, {
        type,
        context,
        language,
        parentId
    });
    return response.data as Stage;
}

export async function fetchPathwayByUserId(): Promise<SimpleStageDTO[]> {
    const respone = await AxiosInstance.get("/pathway/get-by-user");
    return respone.data as SimpleStageDTO[];
}

export async function fetchSubStageCount(stageId: string): Promise<SubStageCountDTO> {
    const response = await AxiosInstance.get(`/pathway/no-of-substage/${stageId}`);
    return response.data as SubStageCountDTO;
}

export async function getRoadmapPublishStatus(stageId: string): Promise<PublishDTO> {
    const response = await AxiosInstance.get(`/pathway/publish-status/${stageId}`);
    return response.data as PublishDTO;
}

export async function togglePublishRoadmap(stageId: string, value: boolean): Promise<void> {
    const respone = await AxiosInstance.put(`/pathway/toggle-publish/${stageId}/${value}`);
    return respone.data;
}


export async function generateSubStageByName({
    type,
    context,
    language,
    parentId
}: PathwayPromptType): Promise<Stage[]> {
    const response = await AxiosInstance.post("/pathway/generate-substage-by-name", {
        type,
        context,
        language,
        parentId
    });
    console.log("Response from generateSubStageByName: ", response.data);
    
    return response.data as Stage[];
}

export async function generateOrFetchTask({
    title,
    description,
    context,
    stageId
} : TaskGenerationDTO) : Promise<string> {
    const response = await AxiosInstance.post("/pathway/generate-task", {
        title,
        description,
        context,
        stageId
    });
    return response.data as string;
}