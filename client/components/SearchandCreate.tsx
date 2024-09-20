"use client"
import {PlusSquare} from "lucide-react";
import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandList,
} from "@/components/ui/command"
import {useSearchStore} from "@/store/SearchStore";

export default function SearchandCreate() {
    const {searchQuery, setSearchQuery} = useSearchStore();
    const router = useRouter();
    const pathname = usePathname();
    const viewAllResultHandler = () => {
        if (pathname.includes("quizzes")) {
            router.push("/app/quizzes/search-results");
        } else if (pathname.includes("pathways")) {
            router.push("/app/pathways/search-results");
        }
    }
    return (<section
        className="flex flex-row gap-3 w-full mt-4 items-start justify-center">
        <Command className={"w-full max-w-[450px] rounded-lg border"}>
            <CommandInput placeholder="Type a command or search..."
                          onValueChange={(value) => setSearchQuery(value)}/>
            <CommandList
                className={`${searchQuery.length == 0 ? "hidden" : "visible"}`}>
                <CommandEmpty>
                    <Button variant={"link"}
                            onClick={viewAllResultHandler}>View
                        all results</Button></CommandEmpty>
            </CommandList>
        </Command>
        <Button size={"icon"} variant={"default"}
                onClick={() => router.push("/app/quizzes/create/prompt")}>
            <PlusSquare className={"w-8 h-8"}
                        strokeWidth={1}></PlusSquare>
        </Button>
    </section>)
        ;
}