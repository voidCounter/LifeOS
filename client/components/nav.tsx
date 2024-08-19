"use client"
import Link from "next/link";
import React from "react";
import navConfig from "@/config/navConfig";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {
    Accordion, AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import NavItem from "@/components/navItem";

export function Nav() {
    const pathname = usePathname();
    return (
        <div className="">
            <nav className="grid gap-1 px-2 w-full">
                <Accordion type="single" collapsible
                           className="hover:decoration-0">
                    {navConfig.navItems.map((navItem, index) => {
                        return (
                            <div key={index} className="flex flex-col">
                                <NavItem label={navItem.label}
                                         icon={navItem.icon} path={navItem.path}
                                         subItems={navItem.subItems}/>
                            </div>
                        )
                    })}
                </Accordion>
            </nav>
        </div>
    );
}