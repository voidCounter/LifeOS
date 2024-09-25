import {AxiosInstance} from "@/utils/AxiosInstance";

export const fetchFeedItemContent = async (feedId: string) => {
    return await AxiosInstance.get(`/feed/${feedId}/content`).then((response: {
        data: string
    }) => response.data)
}

export const fetchFeedItemSummary = async (feedId: string) => {
    return await AxiosInstance.get(`/feed/${feedId}/summary`).then((response: {
        data: string
    }) => response.data)
}

export const fetchFeedItemInsights = async (feedId: string) => {
    return await AxiosInstance.get(`/feed/${feedId}/insights`).then((response: {
        data: string
    }) => response.data)
}
