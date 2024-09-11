import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import Image from "next/image";

export interface ErrorCmpProps {
    status: number,
    title: string,
    message: string
}

export default function ErrorCmp({status, title, message}: ErrorCmpProps) {
    const router = useRouter();

    const getSvg = (code: number): string => {
        switch (code) {
            case 400:
                return '/400-error.svg';
            case 401:
                return '/401-error.svg';
            case 403:
                return '/403-error.svg';
            case 404:
                return '/404-error.svg';
            case 500:
                return '/500-error.svg';
            default:
                return "/error.svg";
        }
    }

    const getErrorMessage = (code: number): string => {
        switch (code) {
            case 400:
                return 'Bad Request';
            case 401:
                return 'Unauthorized';
            case 403:
                return 'Forbidden';
            case 404:
                return 'Page Not Found';
            case 500:
                return 'Internal Server Error';
            default:
                return 'An error occurred';
        }
    };

    const getErrorDescription = (code: number): string => {
        switch (code) {
            case 400:
                return 'The server could not understand the request due to invalid syntax.';
            case 401:
                return 'You are not authorized to access this resource.';
            case 403:
                return 'You do not have permission to access this resource.';
            case 404:
                return 'The page you are looking for might have been removed or is temporarily unavailable.';
            case 500:
                return 'The server encountered an unexpected condition that prevented it from fulfilling the request.';
            default:
                return message;
        }
    };

    return (
        <div
            className="h-full flex items-center justify-center">
            <div
                className="max-w-md w-full text-center items-center flex flex-col -mt-24">
                {/*<h1 className="text-5xl font-bold mb-4">{status}</h1>*/}
                <div className={'w-full text-right'}>
                    <a href="https://storyset.com/" className={"text-xs" +
                        " text-right" +
                        " underline"}>by
                        Storyset</a>
                </div>
                <Image src={getSvg(status)} alt={getErrorMessage(status)}
                       width={400} height={400}/>
                <h2 className="text-2xl font-semibold mb-4">{getErrorMessage(status)}</h2>
                <p className="text-gray-600 mb-8">{getErrorDescription(status)}</p>
                <Button variant={"default"} onClick={() => router.push("/app")}>Go
                    to Homepage</Button>
            </div>
        </div>
    );
}