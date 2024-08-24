"use client"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {quizCreationOptions} from "@/config/QuizCreationTabsConfig";
import CreateQuizCmp from "@/components/quizzes/Quiz/CreateQuizCmp";

export default function CreateQuiz() {
    return (
        <div>
            <Tabs defaultValue={quizCreationOptions[0].tabName}
                  className="w-full mt-4 flex flex-col items-center"
            >
                <TabsList
                    className={`w-full md:w-4/5 grid sticky top-0 z-50 h-fit rounded-xl`}
                    style={{gridTemplateColumns: `repeat(${quizCreationOptions.length}, minmax(0, 1fr))`}}
                >
                    {
                        quizCreationOptions.map((creationOption, index) =>
                            <TabsTrigger key={index}
                                         value={creationOption.tabName} className={"rounded-lg"}>
                                <div className={"rounded-lg flex flex-col" +
                                    " gap-2" +
                                    " justify-center items-center"}>
                                    <creationOption.tabIcon strokeWidth={1}
                                                            className={"w-6" +
                                                                " h-6"}/>
                                    {creationOption.tabName}
                                </div>
                            </TabsTrigger>
                        )
                    }
                </TabsList>
                {
                    quizCreationOptions.map((creationOption, index) =>
                        <TabsContent value={creationOption.tabName} key={index}>
                            <CreateQuizCmp></CreateQuizCmp>
                        </TabsContent>
                    )
                }
            </Tabs>
        </div>
    );
}