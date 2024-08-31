"use client";
import {z} from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {PasswordInput} from "@/components/ui/PasswordInput";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {AxiosResponse} from "axios";
import {JWTTOkenDTO} from "@/types/QuizTypes/JWTTokenDTO";
import {useRouter} from "next/navigation";
import {useAuthStore} from "@/store/AuthStore";

const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
});
export default function LoginForm() {
    const {jwtToken, deleteJwtToken, setJwtToken} = useAuthStore();
    const router = useRouter();
    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onLoginFormSubmit = async (data: z.infer<typeof loginSchema>) => {
        try {
            const response: AxiosResponse<JWTTOkenDTO> = await AxiosInstance.post("/auth/login", data);
            const accessToken = response.data.token;
            AxiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;

            // save the token in the store
            setJwtToken(response.data);
            router.push("/app");
        } catch (error) {
            console.error("Login failed: ", error);
        }
    }

    return (<div className={"flex flex-col"}><Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onLoginFormSubmit)}
              className={"space-y-3  w-full"}>
            <FormField control={loginForm.control} name={"email"}
                       render={({field}) => (
                           <FormItem>
                               <FormControl
                               >
                                   <Input
                                       placeholder={"Email"} {...field}/>
                               </FormControl>
                               <FormMessage className={"text-sm" +
                                   " font-normal"}/>
                           </FormItem>
                       )}>
            </FormField>
            <div className={"flex flex-col gap-2"}>
                <FormField control={loginForm.control}
                           name={"password"}
                           render={({field}) => (
                               <FormItem>
                                   <FormControl
                                   >
                                       <PasswordInput
                                           placeholder={"Password"}
                                           autoComplete="current-password" {...field}
                                       />
                                   </FormControl>
                                   <FormMessage/>
                               </FormItem>
                           )}>
                </FormField>
                <Link href={"/forgot-password"}
                      className={"active:underline text-right" +
                          " text-foreground/60 text-sm" +
                          " hover:underline"}>Forgot
                    password?</Link>
            </div>
            <div className={"w-full pt-4"}>
                <Button type={"submit"} className={"w-full"}
                >Login</Button>
            </div>
        </form>
    </Form>
        <Link
            href={"/register"}
            className={"mt-6 hover:underline active:underline"}>{`Don't have an account? `}<span
            className={"font-medium"}>Register</span></Link>
        <h3 className={"mt-10 text-sm text-foreground/40 text-center"}>
            By logging in, you agree to our <Link
            href="/terms-of-service" className={"underline" +
            " font-medium"}>Terms
            of Service</Link> and <Link
            href="/privacy-policy" className={"underline font-medium"}>Privacy
            Policy</Link>.
        </h3>
    </div>);
}