import Image from "next/image";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface UserAvatarProps {
    avatarURL: string,
    name: string,
    userName: string,
}

export function UserAvatar({avatarURL, name, userName}: UserAvatarProps) {
    return (
        <div
            className="self-stretch justify-start items-center gap-2 inline-flex">
            {/* User avatar */}
            <Avatar className={"h-8 w-8"}>
                <AvatarImage src={avatarURL ?? ""}/>
                <AvatarFallback
                    className={"bg-foreground/20"}>{userName?.toUpperCase()[0] ?? name.toUpperCase()[0]}</AvatarFallback>
            </Avatar>

            {/* User name */}
            <div
                className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                <div
                    className="text-foreground text-sm font-light leading-none">{userName ?? name}</div>
            </div>
        </div>
    );
}