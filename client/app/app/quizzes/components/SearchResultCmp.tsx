import {AxiosResponse} from "axios";
import {Quiz} from "@/types/QuizTypes/Quiz";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {useSearchParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {useEffect} from "react";
import {toast} from "sonner";
import Loading from "@/app/app/loading";
import SearchandCreate from "@/components/SearchandCreate";

interface SearchResultCmpProps<T> {
    baseURL: string,
    renderItem: (item: T) => React.ReactNode;
}

export default function SearchResultCmp<T, >({
                                                 baseURL,
                                                 renderItem
                                             }: SearchResultCmpProps<T>) {
    const searchParams = useSearchParams();
    const queryValue = searchParams.get("query");
    const fetchSearchResult = async () => {
        const axiosResponse: AxiosResponse<Array<T>> = await AxiosInstance.get(`${baseURL}/search?query=${queryValue}`);
        return axiosResponse.data;
    }

    const {
        isLoading,
        isRefetching,
        error,
        data: results,
        refetch: doSearch,
        isSuccess, isStale
    } = useQuery({
        queryFn: () => fetchSearchResult(),
        queryKey: ["search_result"],
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    })
    useEffect(() => {
        doSearch().then();
    }, [queryValue]);

    if (error) {
        toast.error("Failed to fetch search results");
    }
    return (
        <div className={"flex flex-col gap-4"}>
            <SearchandCreate showSearchButton={true} showCreateButton={false}
                             searchValue={queryValue ?? ""}/>
            {
                results &&
                <span> Search results for {`
        "${queryValue}"`}</span>
            }
            {
                (isLoading || isRefetching) ? <Loading/> :
                    results && results.map((item, index) =>
                        <div key={index}>
                            {renderItem(item)}
                        </div>
                    )
            }
            < div className={"py-16"}></div>
        </div>
    );
}