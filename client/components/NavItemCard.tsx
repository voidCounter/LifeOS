"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button";
import {ArrowRightIcon, LucideIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";

export interface NavItemCardProps {
    title: string;
    subTitle: string;
    icon: LucideIcon,
    href: string;
    className?: string,
}

export default function NavItemCard({
                                        title,
                                        subTitle,
                                        icon,
                                        className,
                                        href
                                    }: NavItemCardProps) {
    const router = useRouter();
    return (
        <Card className={cn(className, "flex flex-col" +
            " justify-between")}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subTitle}</CardDescription>
            </CardHeader>
            <CardContent>
            </CardContent>
            <CardFooter
                className={""}>
                <Button size={"icon"} variant={"default"}
                        onClick={() => router.push(href)}><ArrowRightIcon
                    strokeWidth={1}></ArrowRightIcon></Button>
            </CardFooter>
        </Card>
    );

}