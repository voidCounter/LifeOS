"use client"
import {useAuthStore} from "@/store/AuthStore";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function Navbar() {
    const {jwtToken} = useAuthStore();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        setIsAuthenticated(!!jwtToken);
    }, [jwtToken]);
    const router = useRouter();
    return (
        <nav className={" flex flex-row justify-between w-full" +
            " max-w-[800px]" +
            " bg-white/30 backdrop-blur-xl p-2"}>
            <div
                className={"flex flex-row justify-center items-center"}>Lifeos
            </div>
            {/* Login */}
            <div>
                {
                    isAuthenticated && jwtToken ? <Button variant={"outline"}
                                                          onClick={() => router.push("/app")}>{jwtToken.user.email}</Button> :
                        <Button variant={"outline"} size={"sm"}
                                onClick={() => router.push("/login")}>Login</Button>
                }
            </div>
        </nav>
    );
}