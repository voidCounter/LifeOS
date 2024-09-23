import { FileUpIcon, TextIcon } from "lucide-react";

export enum PathwayCreationType  {
    PROMPT = "PROMPT",
    FILE = "FILE",
}

interface PathwayCreationConfig {
    tabIcon: React.FC,
    tabName: string,
}

export const pathwayCreationOptions: PathwayCreationConfig[] = [
    {
        tabIcon: TextIcon,
        tabName: PathwayCreationType.PROMPT,
    },
    {
        tabIcon: FileUpIcon,
        tabName: PathwayCreationType.FILE,
    },

];