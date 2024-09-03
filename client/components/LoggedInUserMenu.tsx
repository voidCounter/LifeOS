"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import LoggedInUserAvatar from "@/components/LoggedInUserAvatar";
import {
    CreditCard,
    Keyboard,
    LifeBuoy,
    LogOut,
    Settings,
    User
} from "lucide-react";
import React from "react";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {useAuthStore} from "@/store/AuthStore";
import {useRouter} from "next/navigation";

export default function LoggedInUserMenu() {
    const {deleteAuthenticatedUser} = useAuthStore();

    const router = useRouter()

    async function logout() {
        try {
            const response = await AxiosInstance.post("/auth/logout");
            if (response.status === 200) {
                deleteAuthenticatedUser();
                router.push("/");
            }
        } catch (error) {
            console.error("Logout failed: ", error);
        }
    }

    return (
        <div className={"p-2 w-full"}>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger className={"w-full"} asChild={false}>
                    <LoggedInUserAvatar/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" side={"top"}>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4"/>
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CreditCard className="mr-2 h-4 w-4"/>
                            <span>Billing</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4"/>
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Keyboard className="mr-2 h-4 w-4"/>
                            <span>Keyboard shortcuts</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator/>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>
                        <LifeBuoy className="mr-2 h-4 w-4"/>
                        <span>Support</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className={"bg-destructive" +
                        " focus:bg-destructive text-background" +
                        " focus:text-background"}
                                      onSelect={logout}>
                        <LogOut className="mr-2 h-4 w-4"/>
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}