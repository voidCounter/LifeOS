"use client"
import { PlusSquare, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SearchandCreate() {
    const router = useRouter();
    return (
        <section className="flex flex-row gap-3 w-full mt-4 justify-center">
            <div className="flex items-center w-full -ml-5 md:w-2/4">
                <Search
                    className="relative text-muted-foreground left-8"
                    strokeWidth={1} />
                <Input
                    placeholder="Roadmaps"
                    className="pl-10 w-full"
                />
            </div>
            <Button
                size={"icon"}
                variant={"default"}
                onClick={() => {
                    router.push("/app/pathways/create/prompt")
                }}
            >
                <PlusSquare
                    className={"w-8 h-8"}
                    strokeWidth={1}
                />
            </Button>
        </section>
    );
}