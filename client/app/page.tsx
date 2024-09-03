"use client"
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import Navbar from "@/app/navbar";

export default function Home() {
    const router = useRouter();
    return (
        <main
            className="w-full h-screen flex flex-col justify-start items-center">
            <main className={"w-full max-w-[1200px] flex flex-col" +
                " justify-center items-center"}>

                   <Navbar/>
                <div
                    className={"w-full flex flex-col gap-4 md:gap-8 items-center" +
                        " mt-40" +
                        " backdrop-blur-1xl"}>
                    <div className={"w-full md:w-[560px]"}>
                        <h1 className={"leading-snug text-3xl sm:text-5xl" +
                            " md:leading-[1.15]" +
                            " tracking-tight" +
                            " font-bold" +
                            " text-center bg-gradient-to-b from-violet-800" +
                            " to-zinc-900 bg-clip-text text-transparent"}>LifeOS
                            : Your Personal Operating
                            System for Growth</h1>
                    </div>
                    <Button variant={"default"} className={"w-fit"}
                            onClick={() => router.push("/login")}>Get
                        started</Button>
                    <div
                        className="blur-3xl absolute opacity-20 -z-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full p-80 -mt-20"></div>
                </div>
            </main>
        </main>
    );
}
