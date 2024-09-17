import SectionHeader from "@/components/SectionHeader";
import { PathwayInputForm } from "../components/PathwayInputForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchandCreate from "../components/SearchandCreate";

export default function Library() {
    return (
        <main className="flex w-full justify-center">
            <div className="flex flex-col gap-8 w-full max-w-[800px]"> 
                <div className="flex flex-col gap-4">
                    <SearchandCreate />
                    <section className="w-full">
                        <SectionHeader title={"Your Library"} description={""}/>
                        <Tabs 
                            defaultValue="roadmaps" 
                            className="w-full mt-4"
                        >
                            <TabsList
                                className={"lg:w-full"
                                    + "grid sticky top-0" + 
                                    "z-50 grid-cols-3"
                                }
                            >
                                <TabsTrigger value="roadmaps" className="px-8">
                                    Roadmaps
                                </TabsTrigger>
                                                                
                            </TabsList>
                            
                        </Tabs>
                    </section>

                    {/* <PathwayInputForm /> */}
                </div>
            </div>
        </main>
    );
}