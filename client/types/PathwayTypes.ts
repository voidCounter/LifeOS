export type PathwayPromptType = {
    prompt: string 
    language: string;
}

export enum GeneratedQuestionType {
    OPEN_ENDED = "OPEN_ENDED",
    YES_NO = "YES/NO",
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    DATE = "DATE"
}

export type GeneratedQuestion = {
    type: GeneratedQuestionType;
    question: string;
    options?: string[];
}