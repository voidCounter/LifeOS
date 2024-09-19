import {useQuizCreationMutation} from "@/hooks/useQuizCreationQuery";
import {useMutation} from "@tanstack/react-query";
import {FileUploaderAxiosInstance} from "@/utils/FileUploadAxiosInstance";
import {toast} from "sonner";

const loadFiles = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    const response = await FileUploaderAxiosInstance.post('/resource-loader/upload', formData);
    return response.data;
}
export const useFileUploadMutation = () => {
    return useMutation({
        mutationFn: (data: File[]) => loadFiles(data),
        onMutate: (data) => {
            toast.loading('Uploading files');
            console.log('Uploading files', data);
        },
        onSettled: () => {
            toast.dismiss();
        },
        onSuccess: (data) => {
            toast.success("Files uploaded successfully");
            console.log('Files uploaded successfully', data);
        },
        onError: (error) => {
            toast.error("Failed to upload files");
            console.log('Failed to upload files', error);
        }
    })
}