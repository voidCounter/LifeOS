"use client";
import {useAuthStore} from "@/store/AuthStore";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import React, {forwardRef} from "react";
import {cn} from "@/lib/utils";

interface LoggedInUserAvatarProps {
    showName?: boolean,
    showUsername?: boolean,
    showAvatar?: boolean,
    onClick?: () => void,
    className?: string,
    variant?: "outline" | "default" | "ghost",
    ref: React.ForwardedRef<HTMLButtonElement>
}

const LoggedInUserAvatar = React.forwardRef<HTMLDivElement, LoggedInUserAvatarProps>(({
                                                                                          showName = true,
                                                                                          showUsername = true,
                                                                                          showAvatar = true,
                                                                                          className,
                                                                                          variant = "ghost",
                                                                                          onClick = () => {
                                                                                          },
                                                                                      }, ref) => {
    const {authenticatedUser} = useAuthStore();
    return (
        <div ref={ref} className={cn(className, "bg-secondary rounded-md" +
            " cursor-pointer" +
            " flex" +
            " h-fit" +
            " justify-start" +
            " items-center" +
            " gap-2 w-full px-2" +
            " items-center")} onClick={onClick}>
            {/* User avatar */}
            <div className={"flex gap-2 w-full items-center"}>
                {
                    showAvatar &&
                    <Avatar className={"h-8 w-8"}>
                        <AvatarImage src={authenticatedUser?.avatarUrl ?? ""}/>
                        <AvatarFallback
                            className={"bg-foreground/20"}>{authenticatedUser?.name.toUpperCase()[0]}</AvatarFallback>
                    </Avatar>
                }

                {/* User name */}
                <div className={"flex flex-col justify-start items-start"}>
                    {
                        showName &&
                        <h1 className={"font-medium text-sm"}>{authenticatedUser?.name}</h1>
                    }
                    {
                        showUsername &&
                        <h3
                            className="text-muted-foreground text-sm leading-none">@{authenticatedUser?.username ?? "username"}</h3>

                    }
                </div>
            </div>
        </div>
    );
});

LoggedInUserAvatar.displayName = "LoggedInUserAvatar";
export default LoggedInUserAvatar;