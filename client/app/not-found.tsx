import Image from "next/image";
import svg404 from "/public/Oops! 404 Error with a broken robot-rafiki.svg"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Image src={"/404-error.svg"} alt={"404 error"} width={400}
                   height={400}/>
            <h1 className="text-3xl font-bold">Page Not Found</h1>
        </div>
    );
}