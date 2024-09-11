// add layout.tsx
import React from "react";
import SidebarLayout from "@/layouts/SidebarLayout";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import {Toaster} from "@/components/ui/sonner";

export default function AppLayout({
                                      children, // will be a page or nested layout
                                  }: {
    children: React.ReactNode
}) {

    return (
        <main className="w-full h-full">
            <SidebarLayout>
                <ProtectedLayout>
                    {children}
                    <Toaster/>
                </ProtectedLayout>
            </SidebarLayout>
        </main>
    )
}
