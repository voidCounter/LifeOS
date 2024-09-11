import {LoaderCircle} from "lucide-react";

export default function Loading() {
    return <div className={"flex w-full h-full justify-center items-center"}>
        <LoaderCircle className={"animate-spin mr-2"}
                      strokeWidth={2}/>
        Loading
    </div>
}