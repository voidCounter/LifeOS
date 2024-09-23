
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
}

export type SimpleStageDTO = {
    stageId : string;
    title: string;
    status: boolean;
    createdAt: Date;
    creator: UserResponseDTO;
    parentId: string;
    noOfTotalStage: number;
    noOfCompletedStage: number;
}

export type UserResponseDTO = {
    userId : string;
    username: string;
    knowledgeXp: number | null
}
