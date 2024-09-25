'use client';
import React, {useEffect} from "react";
import {useAuthStore} from "@/store/AuthStore";
import {usePathname, useRouter} from "next/navigation";

export default function ProtectedLayout({children}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const router = useRouter();
    const {authenticatedUser} = useAuthStore();

    // useEffect(() => {
    //     if (!authenticatedUser?.userId) {
    //         router.push("/login");
    //     }
    // }, [pathname]);

    return (
        <div className={"w-full"}>
            {children}
        </div>
    );
}