"use client"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import React from "react";
import {PasswordInput} from "@/components/ui/PasswordInput";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {FormErrorType} from "@/types/FormErrorType";
import {HttpStatus} from "@/types/HttpStatus";
import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {AxiosError, AxiosResponse} from "axios";
import {User} from "@/types/User";
import Loading from "@/app/app/loading";

const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Password length must be greater" +
            " than 7."
    }).max(16, {message: "Password length must be less than 17."}),
});
export default function Register() {
    const router = useRouter();
    const registerForm = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })

    const {mutate: register, isPending, isError} = useMutation({
        mutationFn: (data: z.infer<typeof registerSchema>) => AxiosInstance.post("/auth/register", data),
        onSuccess: data => {
            const response: AxiosResponse<User> = data;
            if (data.status === HttpStatus.CREATED)
                router.push("/login");
        },
        onError: error => {
            const axiosError: FormErrorType = (error as AxiosError)?.response?.data as FormErrorType;
            registerForm.setError(axiosError.field, {
                type: "server",
                message: axiosError.message
            });
        }
    })

    function onRegisterFormSubmit(data: z.infer<typeof registerSchema>) {
        register(data);
    }

    return (
        <div className={"w-full px-4 h-screen no-scrollbar flex" +
            " justify-center overflow-y-scroll" +
            " items-center"}>
            <div className={"flex flex-col w-full rounded-lg" +
                " max-w-80"}>
                <div className={"flex-col mb-16"}>
                    <h2 className={"text-4xl font-bold"}>{`Create your `}
                        <span
                            className={" bg-gradient-to-br" +
                                " from-violet-400 to-indigo-900 bg-clip-text" +
                                " text-transparent"}>LifeOS</span><span>{` account`}</span>
                    </h2>
                </div>
                <Form {...registerForm}>
                    <form
                        onSubmit={registerForm.handleSubmit(onRegisterFormSubmit)}
                        className={"space-y-3  w-full"}>
                        <FormField control={registerForm.control}
                                   name={"name"}
                                   render={({field}) => (
                                       <FormItem>
                                           <FormControl
                                           >
                                               <Input
                                                   placeholder={"Name"} {...field}/>
                                           </FormControl>
                                           <FormMessage
                                               className={"bg-destructive text-sm text-background p-2 rounded-md" +
                                                   " font-normal"}/>
                                       </FormItem>
                                   )}>
                        </FormField>
                        <FormField control={registerForm.control}
                                   name={"email"}
                                   render={({field}) => (
                                       <FormItem>
                                           <FormControl
                                           >
                                               <Input
                                                   placeholder={"Email"} {...field}/>
                                           </FormControl>
                                           <FormMessage
                                               className={"bg-destructive text-sm text-background p-2 rounded-md" +
                                                   " font-normal"}/>
                                       </FormItem>
                                   )}>
                        </FormField>
                        <FormField control={registerForm.control}
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
                                           <FormMessage
                                               className={"bg-destructive text-sm text-background p-2 rounded-md" +
                                                   " font-normal"}/>
                                       </FormItem>
                                   )}>
                        </FormField>
                        <div className={"w-full pt-4"}>
                            <Button type={"submit"} className={"w-full"}
                                    disabled={isPending}
                            >{isPending ? <Loading
                                text={"Registering"}/> : "Register"}</Button>
                        </div>
                    </form>
                </Form>
                <Link
                    href={"/login"}
                    className={"mt-6 hover:underline active:underline"}>{`Already have an account? `}<span
                    className={"font-medium"}>Login</span></Link>
                <h3 className={"mt-10 text-sm text-foreground/40 text-center"}>
                    By signing up, you agree to our <Link
                    href="/terms-of-service" className={"underline" +
                    " font-medium"}>Terms
                    of Service</Link> and acknowledge that you have read
                    our <Link
                    href="/privacy-policy"
                    className={"underline font-medium"}>Privacy
                    Policy</Link>.
                </h3>

            </div>
        </div>
    );
}