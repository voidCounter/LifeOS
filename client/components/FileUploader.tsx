import {Input} from "@/components/ui/input";

export interface FileUploaderProps {
    onChange: (files: File[]) => void
    multiple?: boolean
    description: string
    value: File[]
    className?: string
}

export default function FileUploader({
                                         onChange,
                                         multiple,
                                         description,
                                         value,
                                         className
                                     }: FileUploaderProps) {
    return (
        <div></div>
    );
}