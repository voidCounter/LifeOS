
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
    dueDate: Date
    title: string
    stageId: string
    createdAt: Date
    parentId: string
    description: JSON
    subStages: Stage[]
}