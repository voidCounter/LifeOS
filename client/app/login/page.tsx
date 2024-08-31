import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel, FormMessage
} from "@/components/ui/form";
import React from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {PasswordInput} from "@/components/ui/PasswordInput";
import axios, {AxiosResponse} from "axios";
import {JWTTokenType} from "@/types/AuthTypes";
import {Cookie} from "lucide-react";
import {useRouter} from "next/navigation";
import LoginForm from "@/app/login/loginForm";

const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export default function Login() {


    const onLoginFormSubmit = async (data: z.infer<typeof loginSchema>) => {
        try {
            const response: AxiosResponse<JWTTokenType> = await axios.post("http://localhost:8080/api/auth/login", data);
            const token = response.data.token;
            console.log("token", token);
        } catch (error) {
            console.error("Login failed: ", error);
        }
    }
    return (
        <div className={"w-full px-4 h-screen no-scrollbar flex" +
            " justify-center overflow-y-scroll" +
            " items-center"}>
            <div className={"flex flex-col w-full rounded-lg" +
                " max-w-80"}>
                <div className={"flex-col mb-16"}>
                    <h2 className={"text-4xl font-bold"}>{`Welcome back to `}
                        <span
                            className={" bg-gradient-to-br" +
                                " from-violet-400 to-indigo-900 bg-clip-text" +
                                " text-transparent"}>LifeOS</span>
                    </h2>
                </div>
            {/*    form*/}
                <LoginForm/>
            </div>
        </div>
    );
}