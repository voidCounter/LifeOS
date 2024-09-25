"use client"
import {PlusIcon, PlusSquare, Search, SearchIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandList,
} from "@/components/ui/command"
import {useSearchStore} from "@/store/SearchStore";
import {Input} from "@/components/ui/input";
import React, {useState} from "react";

interface SearchandCreateProps {
    showCreateButton?: boolean;
    inputPlaceHolder?: string;
    showSearchButton?: boolean;
    onSearch?: () => void;
    searchValue?: string;
    onCreateUrl?: string,
    onCreateHandler?: () => void;
}

export default function SearchandCreate({
                                            showCreateButton = true,
                                            inputPlaceHolder = "Search",
                                            showSearchButton = false,
                                            onCreateHandler,
                                            onCreateUrl,
                                            onSearch,
                                            searchValue
                                        }: SearchandCreateProps) {
    const router = useRouter();
    const pathname = usePathname();

    const [searchQuery, setSearchQuery] = useState(searchValue ?? "");

    const viewAllResultHandler = () => {
        if (pathname.includes("quizzes")) {
            router.push("/app/quizzes/search?query=" + searchQuery);
        } else if (pathname.includes("pathways")) {
            router.push("/app/pathways/search?query=" + searchQuery);
        } else if (pathname.includes("feed")) {
            router.push("/app/feed/search?query=" + searchQuery);
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            viewAllResultHandler();
        }
    }

    return (<section
        className="flex flex-row gap-2 w-full mt-4 items-start justify-center">
        <div className="flex items-center w-full -ml-5 md:w-2/4">
            <Search
                className="relative text-muted-foreground left-8"
                strokeWidth={1}/>
            <Input
                placeholder={inputPlaceHolder}
                value={searchQuery}
                className="pl-10 w-full"
                aria-keyshortcuts={"Enter"}
                onKeyDown={handleKeyPress}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
        {
            showSearchButton &&
            <Button size={"icon"}
                    variant={showCreateButton ? "secondary" : "default"}
                    className={"px-6 flex" +
                        " flex-row w-fit"}
                    onClick={viewAllResultHandler}>
                <SearchIcon className={"w-6 h-6"}
                            strokeWidth={1}></SearchIcon>
            </Button>
        }
        {
            showCreateButton &&
            <Button size={"icon"} variant={"default"} className={"w-fit px-4"}
                    onClick={() => {
                        if (onCreateUrl) {
                            router.push(onCreateUrl);
                        } else if (onCreateHandler) {
                            onCreateHandler();
                        }
                    }}>
                <PlusIcon className={"w-6 h-6"}
                          strokeWidth={1}></PlusIcon>
                Create
            </Button>
        }
    </section>)
        ;
}