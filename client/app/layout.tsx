import type {Metadata} from "next";
import "./globals.css";
import localFont from "next/font/local";
import {Hind_Siliguri} from "next/font/google";
import QueryProvider from "@/layouts/QueryProvicer";
import {Toaster} from "@/components/ui/sonner";


export const metadata: Metadata = {
    title: "LifeOS",
    description: "Life got overpowered using AI",
};

const hindSiliguri = Hind_Siliguri({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ["bengali"],
});

const uncutsans = localFont({
    src: '../public/Uncut-Sans-v1304/Variable/UncutSans-Variable.ttf',
    display: "block",
    fallback: ['hindSiliguri']
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en"
              className={`${uncutsans.className}`}>
        <body className="flex flex-row w-full bg-background">
        <div className="overflow-hidden w-full h-screen">
            <QueryProvider>
                <Toaster/>
                {children}
            </QueryProvider>
        </div>
        </body>
        </html>
    );
}
