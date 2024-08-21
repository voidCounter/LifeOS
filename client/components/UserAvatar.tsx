import Image from "next/image";

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
            <Image alt={"avatar"} className="w-7 h-7 rounded-full"
                   width={7}
                   height={8}
                   src={avatarURL}/>

            {/* User name */}
            <div
                className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                <div
                    className="text-foreground text-sm font-light leading-none">{userName}</div>
            </div>
        </div>
    );
}