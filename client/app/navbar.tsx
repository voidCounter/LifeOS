"use client"
import {useAuthStore} from "@/store/AuthStore";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import LoggedInUserAvatar from "@/components/LoggedInUserAvatar";

export default function Navbar() {
    const {authenticatedUser, setAuthenticatedUser} = useAuthStore();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        setIsAuthenticated(!!authenticatedUser);
    }, [authenticatedUser]);
    const router = useRouter();
    return (
        <nav className={"flex fixed top-0 flex-row justify-between w-full" +
            " max-w-[800px]" +
            " backdrop-blur-md p-1"}>
            <div
                className={"flex flex-row justify-center items-center"}>Lifeos
            </div>
            {/* Login */}
            <div>
                {
                    isAuthenticated && authenticatedUser ?
                        <LoggedInUserAvatar showUsername={false}
                                            className={"p-1"}
                                            variant={"ghost"}
                                            onClick={() => router.push("/app")}/> :
                        <Button variant={"outline"} size={"sm"}
                                onClick={() => router.push("/login")}>Login</Button>
                }
            </div>
        </nav>
    );
}