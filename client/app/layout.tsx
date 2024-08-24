import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import SidebarLayout from "@/layouts/SidebarLayout";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/lib/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const uncutsans = localFont({
    src: '../public/Uncut-Sans-v1304/Variable/UncutSans-Variable.ttf',
    display: "swap",
});

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "LifeOS",
    description: "Life got overpowered using AI",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${uncutsans.className}`}>
        <body className="flex flex-row w-full">
        <div className="overflow-hidden w-full">
            <SidebarLayout>
                    <ReactQueryDevtools initialIsOpen={false}/>
                    {children}
            </SidebarLayout>
        </div>
        </body>
        </html>
    );
}
