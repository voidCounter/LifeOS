'use client';
import React, {useEffect} from "react";
import {useAuthStore} from "@/store/AuthStore";
import {useRouter} from "next/navigation";

export default function ProtectedLayout({children}: {
    children: React.ReactNode
}) {
    const router = useRouter();
    const {authenticatedUser} = useAuthStore();

    useEffect(() => {
        if (!authenticatedUser) {
            router.push("/login");
        }
    }, [authenticatedUser, router]);

    return (
        <div className={"w-full"}>{children}</div>
    );
}