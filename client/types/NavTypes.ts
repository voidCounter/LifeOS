import {LucideIcon} from "lucide-react";

interface NavSubItemType{
    label: string
    path: string
}

interface NavItemType {
    label: string
    path: string
    icon: LucideIcon,
    subItems?: NavSubItemType[]
}
interface NavConfigType {
    navItems: NavItemType[]
}

export type {NavSubItemType, NavItemType, NavConfigType};
