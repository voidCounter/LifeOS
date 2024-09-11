import {useEffect} from "react";
import {toast} from "sonner";

interface useErrorNotificationProps {
    isError: boolean,
    title: string,
    description: string,
    status?: 'error'
}

export function useErrorNotification({
                                         isError, title, description, status
                                     }: useErrorNotificationProps) {

    useEffect(() => {
        if (isError) {
            toast.error(title ?? "Error", {
                cancel: true,
                description: description,
                duration: 5000
            });
        }
    }, [isError])
}