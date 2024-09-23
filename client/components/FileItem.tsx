import {FileIcon, TrashIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

export interface FileItemProps {
    file: File,
    onDeleted: () => void,
    className?: string,

    [key: string]: any
}

export default function FileItem({
                                     file,
                                     className,
                                     onDeleted,
                                     ...rest
                                 }: FileItemProps) {
    return (
        <div
            className={cn(className, "flex flex-row p-3 border rounded-lg" +
                " items-center justify-between" +
                "  w-full")} {...rest}>
            <div className={"flex flex-row gap-3 h-full items-center w-full"}>
                <FileIcon size={24} className={"text-muted-foreground"}
                          strokeWidth={1}/>
                <div className={"flex flex-col items-between h-full" +
                    ""}>
                    <p
                        className={"pr-2 text-sm"}>{file.name.length > 30 ? file.name.slice(0, 20) + "..." + file.name.slice(Math.max(21, file.name.length - 10), file.name.length) : file.name}</p>
                    <p
                        className={"text-muted-foreground"}>{file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase() + " "}
                        |{" " + (file.size / (1024 * 1024)).toFixed(2)}MB
                    </p>
                </div>
            </div>
            <Button className={""} type={"button"} variant={"ghost"}
                    onClick={() => onDeleted()}
                    size={"sm"}>
                <TrashIcon className={"ml-auto" +
                    " text-foreground"} strokeWidth={1}/>
            </Button>
        </div>
    );

}