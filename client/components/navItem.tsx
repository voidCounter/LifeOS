"use client";
import {NavItemType} from "@/types/NavTypes";
import {cn} from "@/lib/utils";
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import React, {useEffect} from "react";
import {usePathname} from "next/navigation";

export default function NavItem(navItem: NavItemType) {
    const pathName = usePathname();
    const isActive = pathName.startsWith(navItem.path);

    if (navItem.subItems) {
        return (
            <div>
                <AccordionItem
                    value={navItem.label}
                    className={cn("border-b-0")}>
                    <AccordionTrigger
                        className="focus:outline-0 h-[40px] hover:bg-secondary rounded-md px-4">
                        <div
                            className={cn("flex flex-row gap-2 justify-start", isActive && "text-success-foreground")}>
                            <navItem.icon
                                className={"w-6 h-6"}
                                strokeWidth={1}></navItem.icon>
                            <span
                                className="text-base hover:decoration-0">{navItem.label}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent
                        className="pb-0">
                        {
                            navItem.subItems && navItem.subItems.map((subNavItem, index) => {
                                    const isActive = pathName === subNavItem.path;
                                    return (
                                        <div key={index}
                                             className="flex flex-col">
                                            <Link
                                                href={`${subNavItem.path}`}
                                                className={cn(buttonVariants({variant: "ghost"}), "gap-2 justify-start")}>
                                                <div
                                                    className="w-6 h-6"></div>
                                                <span
                                                    className={cn("text-base", isActive && "text-success-foreground")}>{subNavItem.label}</span>
                                            </Link>
                                        </div>
                                    );
                                }
                            )
                        }
                    </AccordionContent>
                </AccordionItem></div>);
    }
    return (
        <Link href={`${navItem.path}`}
              className={cn(buttonVariants({variant: "ghost"}),
                  " justify-start  w-full",)}>
            <div className={cn(isActive && "text-success-foreground", "flex" +
                " gap-2")}>
                <navItem.icon className={"w-6" +
                    " h-6"}
                              strokeWidth={1}></navItem.icon>
                <span
                    className={cn("text-base ",)}>{navItem.label}</span>
            </div>
        </Link>
    );

}