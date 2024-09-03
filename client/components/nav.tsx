import React from "react";
import navConfig from "@/config/navConfig";
import {cn} from "@/lib/utils";
import {
    Accordion, AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import NavItem from "@/components/navItem";
import {UserAvatar} from "@/components/UserAvatar";
import LoggedInUserAvatar from "@/components/LoggedInUserAvatar";
import {Button} from "@/components/ui/button";
import {
    CreditCard,
    Keyboard,
    LifeBuoy,
    LogOut,
    Settings,
    User
} from "lucide-react";
import LoggedInUserMenu from "@/components/LoggedInUserMenu";

export function Nav({className}: { className?: string }) {
    return (
        <div
            className={`w-full ${cn(className)} h-full flex flex-col justify-between`}>
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
            <LoggedInUserMenu/>
        </div>
    );
}