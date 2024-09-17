import { PathwayPromptType } from "@/types/PathwayTypes";
import { AxiosInstance } from "@/utils/AxiosInstance";


export async function generatePathwayByPrompt({
    prompt,
    language
} : PathwayPromptType): Promise<string> {
    const response = await AxiosInstance.post("/pathway/generate", {
        prompt,
        language
    });
    return response.data;
}
