"use client";
import Image from "next/image";
import {useState} from "react";
import {cn} from "@/lib/utils";

interface ImgaeComponentProps {
    src: string,
    alt: string,
    className: string,
}

export default function ImageComponent({
                                           src,
                                           alt,
                                           className
                                       }: ImgaeComponentProps) {
    const [isImageLoading, setImageLoading] = useState(true)

    return (
        <Image
            alt={alt}
            src={src}
            fill={true}
            sizes={"100%"}
            onLoad={() => setImageLoading(false)}
            className={cn(className, `${isImageLoading ? 'blur' +
                ' transition-filter duration-300 ease-in' : 'blur-none' +
                ' transition-filter duration-300 ease-in'} object-cover `)}
        />
    )
}