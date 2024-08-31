'use client';
import React from "react";
import {useAuthStore} from "@/store/AuthStore";
import {useRouter} from "next/navigation";

export default function ProtectedLayout({children}: {
    children: React.ReactNode
}) {
    const router = useRouter();
    const {jwtToken} = useAuthStore();
    if (!jwtToken) {
        router.push("/");
    }
    return (
        <div className={"w-full"}>{children}</div>
    );
}