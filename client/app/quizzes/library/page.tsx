"use client";
import {Input} from "@/components/ui/input";
import {PlusSquare, Search} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import CreatedQuizzes from "@/components/quizzes/Quiz/CreatedQuizzes";
import TakenQuizTests from "@/components/quizzes/Quiz/TakenQuizTests";
import SectionHeader from "@/components/SectionHeader";

export default function Explore() {

    return (
        <main
            className="flex flex-col gap-8 w-full">
            {/* Search and create */}
            <section className="flex flex-row gap-3 w-full mt-4 justify-center">
                <div className="flex items-center w-full -ml-5 md:w-2/4">
                    <Search
                        className="relative text-muted-foreground left-8"
                        strokeWidth={1}/>
                    <Input
                        placeholder="Quizzes"
                        onChange={(event) => {
                        }}
                        className="pl-10 w-full"
                    />
                </div>
                <Button size={"icon"} variant={"default"}>
                    <PlusSquare className={"w-8 h-8"}
                                strokeWidth={1}></PlusSquare>
                </Button>
            </section>

            {/* Library */}
            <section className={"w-full"}>
                <SectionHeader title={"Your Library"} description={""}/>
                <Tabs defaultValue="quizzes" className="w-full mt-4"
                >
                    <TabsList className={"w-full md:w-3/5 lg:w-2/5 grid" +
                        " sticky top-0 z-50" +
                        " grid-cols-3"}>
                        <TabsTrigger value="quizzes">Quizzes
                        </TabsTrigger>
                        <TabsTrigger value="practice_tests">Practice
                            Tests</TabsTrigger>
                        <TabsTrigger value="folders">Folders</TabsTrigger>
                    </TabsList>
                    <TabsContent value="quizzes"
                    >
                        <CreatedQuizzes/>
                    </TabsContent>
                    <TabsContent value="practice_tests">{
                        <TakenQuizTests/>
                    }</TabsContent>
                    <TabsContent value="folders">Your folders</TabsContent>
                </Tabs>
            </section>
        </main>
    );
}