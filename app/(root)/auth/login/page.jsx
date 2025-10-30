'use client'

import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import Logo from '@/public/assets/images/logo-black.png'
import Image from "next/image";
import { zodResolver } from '@hookform/resolvers/zod';
import { zSchema } from '@/lib/zodSchema';
import ButtonLoading from '@/components/Application/ButtonLoading';
import { z } from "zod";


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // 👁️ state

    const formSchema = zSchema.pick({
        email: true,
    }).extend({
        password: z.string().min(3, { message: "Password is required" }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const handleLoginSubmit = async (values) => {
        console.log(values)
    }

    return (
        <Card className='w-[400px]'>
            <CardContent>
                <div className='flex justify-center'>
                    <Image src={Logo.src} width={Logo.width} height={Logo.height} alt="Logo" className='max-w-[150px]' />
                </div>

                <div className='text-center mb-5'>
                    <h1 className='text-2xl font-semibold'>Login Into Account</h1>
                    <p>Login into your account by filling out the form below</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleLoginSubmit)}>
                        {/* Email field */}
                        <div className='mb-5'>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="example@gmail.com" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Password field with eye icon */}
                        <div className='mb-5'>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    type={showPassword ? "text" : "password"} // 👁️ toggle
                                                    placeholder="*******"
                                                    {...field}
                                                    className="pr-10" // icon এর জন্য ডানদিকে জায়গা
                                                />
                                            </FormControl>

                                            {/* 👁️ eye icon */}
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                {showPassword ? (
                                                       <Eye className="w-5 h-5" />
                                                ) : (
                                                     <EyeOff className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Submit button */}
                        <div>
                            <ButtonLoading
                                type="submit"
                                text="Login"
                                loading={loading}
                                className="w-full cursor-pointer text-white bg-violet-700 hover:bg-violet-800"
                            />
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default LoginPage
