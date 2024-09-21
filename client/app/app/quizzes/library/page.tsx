"use client";
import {Input} from "@/components/ui/input";
import {PlusSquare, Search} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import CreatedQuizzes from "@/components/quizzes/Quiz/CreatedQuizzes";
import TakenQuizTests from "@/components/quizzes/Quiz/TakenQuizTests";
import SectionHeader from "@/components/SectionHeader";
import {router} from "next/client";
import SearchandCreate from "@/components/SearchandCreate";

export default function Explore() {
    return (
        <main
            className="w-full flex justify-center">
            <div className={"flex flex-col gap-8 w-full max-w-[800px]"}>
                {/* Search and create */}
                <SearchandCreate/>
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
                        <TabsContent value="quizzes" className={"w-full"}
                        >
                            <CreatedQuizzes/>
                        </TabsContent>
                        <TabsContent value="practice_tests">{
                            <TakenQuizTests/>
                        }</TabsContent>
                        <TabsContent value="folders">Your folders</TabsContent>
                    </Tabs>
                </section>
            </div>
        </main>
    );
}