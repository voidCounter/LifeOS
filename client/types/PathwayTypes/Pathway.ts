
export enum StageType {
    ROADMAP = "ROADMAP",
    MILESTONE = "MILESTONE",
    MODULE = "MODULE",
    TASK = "TASK",
    QUIZ = "QUIZ",
    PROJECT = "PROJECT"
};

export type Stage = {
    type : StageType
    status: boolean
    dueDate: Date | null
    title: string
    stageId: string
    createdAt: Date
    parentId: string
    description: string
    subStages: Stage[] | null
    content: string | null
}

export type SimpleStageDTO = {
    stageId : string;
    title: string;
    isPublished: boolean;
    createdAt: Date;
}

export type UserResponseDTO = {
    userId : string;
    username: string;
    knowledgeXp: number | null
}

export type SubStageCountDTO = {
    noOfSubStages: number;
}

export type PublishDTO = {
    isPublished: boolean;
}

export type TaskGenerationDTO = {
    title: string;
    description: string;
    context: string;
    stageId: string;
}
